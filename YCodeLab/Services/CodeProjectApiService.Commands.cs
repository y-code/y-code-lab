using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using YCodeLab.Models.CodeProjectApi;

namespace YCodeLab.Services
{
	public partial class CodeProjectApiService
	{
        private abstract class ServiceCommand : ICommand
        {
            protected CodeProjectApiService _service;
            protected ILogger<CodeProjectApiService> _logger;
            protected DateTime _startTime;
            public CommandStatus Status { get; private set; } = CommandStatus.ReadyToRun;
            public Exception Exception { get; private set; }

            private SemaphoreSlim semaphore = new SemaphoreSlim(1, 1);

            public ServiceCommand(CodeProjectApiService service, ILogger<CodeProjectApiService> logger, TimeSpan? delay)
            {
                _service = service;
                _logger = logger;
                _startTime = DateTime.UtcNow + (delay ?? TimeSpan.Zero);
            }

            public async Task<bool> TryProcessAsync()
            {
                await semaphore.WaitAsync();

                if (_startTime > DateTime.UtcNow
                    || Status != CommandStatus.ReadyToRun)
                {
                    semaphore.Release();
                    return false;
                }

                Status = CommandStatus.Running;
                semaphore.Release();

                try
                {
                    await ProcessAsync();
                }
                catch (CodeProjectApiException e)
                {
                    Exception = e;
                }
                catch (Exception e)
                {
                    Exception = e;
                    
                }
                Status = CommandStatus.Completed;

                return true;
            }

            protected abstract Task ProcessAsync();

            public abstract ICommand[] CreateNextCommands();
        }

        private class CommandGetAll : ServiceCommand
        {
            private class CodeProjectInfo : ICodeProjectApiService.ICodeProjectInfo
            {
                public ICPMyProfileModel MyProfile { get; set; }
                public ICPArticleCollectionModel MyArticles { get; set; }
                public ICPBlogPostCollectionModel MyBlogPosts { get; set; }
                public ICPTipCollectionModel MyTips { get; set; }
            }

#if DEBUG
            const double intervalInSeconds = 5d;
#else
            const double intervalInSeconds = 30d;
#endif

            public CommandGetAll(CodeProjectApiService service, ILogger<CodeProjectApiService> logger, TimeSpan? delay = null)
                : base(service, logger, delay)
            {
            }

            protected override async Task ProcessAsync()
            {
                var info = new CodeProjectInfo();
                Task task1 = Task.Run(async () => info.MyProfile = await _service.GetMyProfile());
                Task task2 = Task.Run(async () => info.MyArticles = await _service.GetMyArticles(1));
                Task task3 = Task.Run(async () => info.MyBlogPosts = await _service.GetMyBlogPosts(1));
                Task task4 = Task.Run(async () => info.MyTips = await _service.GetMyTips(1));
                Task.WaitAll(task1, task2, task3, task4);
                _service.Cache = info;
            }

            public override ICommand[] CreateNextCommands()
            {
                double interval;
                if (Exception == null)
                    interval = intervalInSeconds;
                else if (Exception is InvalidCredentialException)
                    return new ICommand[]
                    {
                        new CommandMonitorCPPasswordUpdate(_service, _logger, () => new ICommand[]
                            {
                                new CommandGetAll(_service, _logger)
                            })
                    };
                else if (Exception is ApiMethodNotFoundException)
#if DEBUG
                    interval = 1d;
#else
                    interval = 10d;
#endif
                else
                    interval = 60d * 60;

                return new ICommand[]
                {
                    new CommandGetAll(_service, _logger, TimeSpan.FromSeconds(interval))
                };
            }
        }

        private class CommandMonitorCPPasswordUpdate : ServiceCommand
        {
            private bool _isUpdated = false;
            private string _password;
            private Func<ICommand[]> _createCommands;

            public CommandMonitorCPPasswordUpdate(CodeProjectApiService service, ILogger<CodeProjectApiService> logger, Func<ICommand[]> createCommands)
                : base(service, logger, TimeSpan.FromSeconds(1d))
            {
                _password = _service.password;
                _createCommands = createCommands;
            }

            protected override Task ProcessAsync()
            {
                _isUpdated = _service.password == _password;
                return Task.CompletedTask;
            }

            public override ICommand[] CreateNextCommands()
            {
                if (_isUpdated)
                    return _createCommands();
                else
                    return new ICommand[]
                    {
                        new CommandMonitorCPPasswordUpdate(_service, _logger, _createCommands)
                    };
            }
        }
    }
}
