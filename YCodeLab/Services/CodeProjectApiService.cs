using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using YCodeLab.Models.CodeProjectApi;
using YCodeLab.Services.Net;
using System.Text;
using System.IO;
using System.Threading;
using Microsoft.Extensions.Hosting;

namespace YCodeLab.Services
{
    public interface ICodeProjectApiService : IHostedService
    {
        public interface ICodeProjectInfo
        {
            ICPMyProfileModel MyProfile { get; }
            ICPArticleCollectionModel MyArticles { get; }
            ICPBlogPostCollectionModel MyBlogPosts { get; }
            ICPTipCollectionModel MyTips { get; }
        }

        ICodeProjectInfo Cache { get; }
    }

    public partial class CodeProjectApiService : ICodeProjectApiService
    {
        public enum ServiceStatus
        {
            Stop,
            Running,
            Stopping,
        }

        private interface ICommand
        {
            public CommandStatus Status { get; }
            Task<bool> TryProcessAsync();
            ICommand[] CreateNextCommands();
        }

        private enum CommandStatus
        {
            ReadyToRun,
            Running,
            Completed,
        }

        public ICodeProjectApiService.ICodeProjectInfo Cache { get; private set; }

        const string baseUrl = "https://api.codeproject.com";
        const string clientId = "g2gogUEPr-HNgn7P6gk8Vj3WHG27hhpD";
        const string clientSecret = "DrV1tU1NxS09TZX3VDXkSZShK-tQPb0oagsy5m1i7p79G53yKJCGzUTP_sMqNNjQ";
        const string userName = "yasu.gemini@gmail.com";
        private string password => Environment.GetEnvironmentVariable("CPP");

        const int serviceHeartBeatInMillisecounds = 1000;

        private readonly ILogger<CodeProjectApiService> _logger;
        private readonly IHttpWebRequestFactory _webRequestFactory;
        private readonly CodeProjectSiteService _cpSiteService;
        private Credential _credential;

        public SemaphoreSlim semaphore = new SemaphoreSlim(1, 1);

        private Task _serviceTask;
        public ServiceStatus Status { get; private set; } = ServiceStatus.Stop;
        private List<ICommand> _commands = new List<ICommand>();

        public CodeProjectApiService(
            ILogger<CodeProjectApiService> logger,
            IHttpWebRequestFactory webRequestFactory,
            CodeProjectSiteService cpSiteService)//,
            //CodeProjectInfoCache cache)
        {
            _logger = logger;
            _webRequestFactory = webRequestFactory;
            _cpSiteService = cpSiteService;
            //_cache = cache;
        }

        public class GrantType
        {
            public static readonly GrantType ClientCredentials = new GrantType("client_credentials");
            public static readonly GrantType ResourceOwnerPassword = new GrantType("password");

            public readonly string Name;
            private GrantType(string name)
            {
                Name = name;
            }
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            // _commands.Add(new CommandGetAll(this, _logger));
            // _serviceTask = Run();
            return Task.CompletedTask;
        }

        public async Task Run()
        {
            Status = ServiceStatus.Running;
            while (Status == ServiceStatus.Running)
            {
                try
                {
                    foreach (var command in _commands.ToArray())
                    {
                        command.TryProcessAsync();
                        if (command.Status == CommandStatus.Completed)
                        {
                            _commands.Remove(command);
                            _commands.AddRange(command.CreateNextCommands());
                        }
                    }
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "An exception occurred in Code Project API Service process.");
                }
                await Task.Delay(serviceHeartBeatInMillisecounds);
            }

            Status = ServiceStatus.Stop;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            Status = ServiceStatus.Stopping;
            return Task.CompletedTask;
        }

        public class Credential
        {
            public readonly GrantType GrantType;
            public readonly string Token;
            public Credential(GrantType grantType, string token)
            {
                GrantType = grantType;
                Token = token;
            }
        }

        public async Task GetApiCredential(GrantType grantType)
        {
            await semaphore.WaitAsync();
            try
            {
                await InnerGetApiCredential(grantType);
            }
            catch (Exception e)
            {
                throw;
            }
            finally
            {
                semaphore.Release();
            }
        }

        private async Task InnerGetApiCredential(GrantType grantType, int retryCounter = 0)
        {
            if (_credential?.GrantType == grantType)
                return;

            _credential = null;

            var data = new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("grant_type",    grantType.Name),
                    new KeyValuePair<string, string>("client_id",     clientId),
                    new KeyValuePair<string, string>("client_secret", clientSecret),
                };
            if (grantType == GrantType.ResourceOwnerPassword)
            {
                data.Add(new KeyValuePair<string, string>("username", userName));
                data.Add(new KeyValuePair<string, string>("password", password));
            }
            var strData = data.Select(d => $"{d.Key}={d.Value}").Aggregate((a, b) => $"{a}&{b}");

            var req = _webRequestFactory.Create(new Uri($"{baseUrl}/token"));
            req.Method = "POST";
            req.ContentType = "application/x-www-form-urlencoded";
            req.ContentLength = Encoding.ASCII.GetBytes(strData).Length;
            using (var w = new StreamWriter(req.GetRequestStream()))
                w.Write(strData);

            try
            {
                using (var response = await req.GetResponseAsync())
                {
                    var responseStatus = response.StatusCode;

                    var responseStream = response.GetResponseStream();
                    string json;
                    using (var r = new StreamReader(responseStream))
                        json = await r.ReadToEndAsync();

                    object responseData = JsonConvert.DeserializeObject(json);

                    var token = (string)((dynamic)responseData)?.access_token;
                    Credential credential = null;
                    if (!string.IsNullOrEmpty(token))
                    {
                        credential = new Credential(grantType, token);
                        if (string.IsNullOrEmpty(credential.Token))
                            credential = null;
                    }
                    if (credential == null)
                    {
                        switch (responseStatus)
                        {
                            case HttpStatusCode.OK:
                                _logger.LogCritical("The response from Code Project Token API was not as expected.");
                                throw new ApiMethodResponseInUnexpectedFormatException(req.RequestUri, responseStatus, json);
                            default:
                                _logger.LogCritical("Authentication failed by an unknown reason.");
                                throw new CodeProjectApiException(req.RequestUri, responseStatus, json,
                                    "Authentication failed by an unknown reason.");
                        }
                    }
                    else
                        _credential = credential;
                }
            }
            catch (WebExceptionWrapper e)
            {
                var responseStatus = e.ResponseStatusCode;
                var responseMessage = e.ResponseMessage;
                switch (responseStatus)
                {
                    case HttpStatusCode.NotFound:
                        if (retryCounter < 5)
                        {
                            _logger.LogWarning("Failed to obtain token from Code Project API server with Not Found http error (Status Code: {StatusCode}).", responseStatus);
                            await InnerGetApiCredential(grantType, ++retryCounter);
                        }
                        else
                        {
                            _logger.LogWarning("Even after 5 times try, failed to obtain token from Code Project API server.");
                            throw new ApiMethodNotFoundException(req.RequestUri, responseStatus, responseMessage, e);
                        }
                        break;
                    case HttpStatusCode.BadRequest:
                        _logger.LogCritical("Authentication failed. Credential needs to be confirmed.");
                        throw new InvalidCredentialException(req.RequestUri, responseStatus, responseMessage, e);
                    default:
                        _logger.LogWarning("Failed to obtain token from Code Project API server with an unknown reason (Status Code: {StatusCode}).", responseStatus);
                        throw new CodeProjectApiException(req.RequestUri, responseStatus, responseMessage, e,
                            $"Failed to obtain token from Code Project API server with an unknown reason.");
                }
            }
        }

        public Task<ICPMyProfileModel> GetMyProfile(int retryCounter = 0)
            => Get<ICPMyProfileModel, CPMyProfileModel>("v1/My/Profile", "", "Failed to get my profile from Code Project API server");

        public async Task<ICPArticleCollectionModel> GetMyArticles(int page)
        {
            var posts = await Get<ICPArticleCollectionModel, CPArticleCollectionModel>("v1/My/articles", $"page={page}", "Failed to get articles from Code Project API server");
            var siteServiceTasks = posts.ToArray()
                .Select(async (p, i) => posts[i] = await _cpSiteService.AppendInfo(p))
                .ToArray();
            Task.WaitAll(siteServiceTasks);
            return posts;
        }

        public async Task<ICPBlogPostCollectionModel> GetMyBlogPosts(int page, int retryCounter = 0)
        {
            var posts = await Get<ICPBlogPostCollectionModel, CPBlogPostCollectionModel>("v1/My/blogposts", $"page={page}", "Failed to get blog posts from Code Project API server");
            var siteServiceTasks = posts.ToArray()
                .Select(async (p, i) => posts[i] = await _cpSiteService.AppendInfo(p))
                .ToArray();
            Task.WaitAll(siteServiceTasks);
            return posts;
        }

        public async Task<ICPTipCollectionModel> GetMyTips(int page, int retryCounter = 0)
        {
            var posts = await Get<ICPTipCollectionModel, CPTipCollectionModel>("v1/My/tips", $"page={page}", "Failed to get tips from Code Project API server");
            var siteServiceTasks = posts.ToArray()
                .Select(async (p, i) => posts[i] = await _cpSiteService.AppendInfo(p))
                .ToArray();
            Task.WaitAll(siteServiceTasks);
            return posts;
        }

        protected async Task<I> Get<I, T>(string apiMethod, string query, string logMessage, int retryCounter = 0)
            where T : I, ICPModel, new()
        {
            await GetApiCredential(GrantType.ResourceOwnerPassword);
            if (_credential == null)
                return default(T);

            var request = _webRequestFactory.Create(new Uri($"{baseUrl}/{apiMethod}?{query}"));
            request.Method = "GET";
            request.Headers = new WebHeaderCollection
            {
                { HttpRequestHeader.Authorization, $"Bearer {_credential.Token}" }
            };

            I data = default(T);
            try
            {
                using (var response = await request.GetResponseAsync())
                {
                    var responseStatus = response.StatusCode;

                    string json = null;
                    using (var r = new StreamReader(response.GetResponseStream()))
                        json = await r.ReadToEndAsync();
                    if (!string.IsNullOrEmpty(json))
                    {
                        var d = Activator.CreateInstance<T>();
                        d.SetUpByJson(json);
                        if (d.Validate())
                            data = d;
                    }
                    if (data == null)
                    {
                        _logger.LogWarning($"{ProcessLogMessageToStartWithUpper(logMessage)}.");
                        switch (responseStatus)
                        {
                            case HttpStatusCode.OK:
                                _logger.LogCritical($"The response from Code Project API {request.RequestUri} was not as expected.");
                                throw new ApiMethodResponseInUnexpectedFormatException(request.RequestUri, responseStatus, json);
                            default:
                                _logger.LogCritical($"Code Project API {request.RequestUri} failed by an unknown reason.");
                                throw new CodeProjectApiException(request.RequestUri, responseStatus, json,
                                    "Code Project API failed by an unknown reason.");
                        }
                    }
                }
            }
            catch (WebExceptionWrapper e)
            {
                var responseStatus = e.ResponseStatusCode;
                var responseMessage = e.ResponseMessage;
                switch (responseStatus)
                {
                    case HttpStatusCode.NotFound:
                        if (retryCounter < 5)
                        {
                            _logger.LogWarning($"{ProcessLogMessageToStartWithUpper(logMessage)} with Not Found http error. (Status Code: {{StatusCode}})", responseStatus);
                            return await Get<I, T>(apiMethod, query, logMessage, ++retryCounter);
                        }
                        else
                        {
                            _logger.LogWarning($"Even after 5 times try, {ProcessLogMessageToStartWithLower(logMessage)}.");
                            throw new ApiMethodNotFoundException(request.RequestUri, responseStatus, responseMessage, e);
                        }
                    default:
                        _logger.LogWarning("Failed to obtain token from Code Project API server with an unknown reason (Status Code: {StatusCode}).", responseStatus);
                        throw new CodeProjectApiException(request.RequestUri, responseStatus, responseMessage, e,
                            $"Failed to obtain token from Code Project API server with an unknown reason.");
                }
            }

            return data;
        }

        private string ProcessLogMessageToStartWithUpper(string message)
        {
            if (string.IsNullOrEmpty(message))
                return message;
            return message[0].ToString().ToUpper() + message.Substring(1, message.Length - 1);
        }

        private string ProcessLogMessageToStartWithLower(string message)
        {
            if (string.IsNullOrEmpty(message))
                return message;
            return message[0].ToString().ToLower() + message.Substring(1, message.Length - 1);
        }
    }
}
