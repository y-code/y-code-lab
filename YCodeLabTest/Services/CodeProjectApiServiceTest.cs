using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using HtmlAgilityPack;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using Serilog;
using YCodeLab.Services;
using YCodeLab.Services.HtmlAgilityPack;
using YCodeLab.Services.Net;
using ILogger = Microsoft.Extensions.Logging.ILogger;

namespace YCodeLab.Test.Services
{
    [TestFixture(TestOf = typeof(CodeProjectApiService))]
    [Parallelizable(ParallelScope.Children)]
    public partial class CodeProjectApiServiceTest
    {
        const string validTokenApiResponse = @"{""access_token"":""SfmBI6d00ba-HKo_6P9M8Jzb-dR95EzlWgQ_oWSUINPhp1A1Xy4b9WuO-YM24NuVakgCYauUeaQsi59sy3rrmFN1Xj396MDJcMdHGuk3LIBRXK7qIxzYyJKVIsvPzafer2vT0j6XXujIjVeyQERcvHQIPzAHa125Zy8CsGUcTBQEliTMeltxiOQZ-V5siI31U0MWe6ecPpUdC19Lm8mTZACdkKXzCpFzgoB0roVIpVumicgdc5LN9GRA5uJ7Jl00oYaVztYW1l__UzIQfJKyhAa6kpskEtD6tqZR_klYsatz4ygJpMulForM9Sk1GaH8z4FR43aCxs_RAONIONT2njQrMGz26xThfgDUd45FQu9hcWCdz-nbEAxbWGGCNO7hDljqwljgYmf6rTQT_vmKDEfqg99TGuAKAECLunmY1S81_Sl__RYYB6QKyDyVZ6_l1SQwJw"",""token_type"":""bearer"",""expires_in"":1209599}";
        const string validGetMyArticlesResponse = @"{""pagination"":{""page"":1,""pageSize"":25,""totalPages"":1,""totalItems"":2},""items"":[{""id"":""2_1265638"",""title"":""ASP.NET Core - Authentication UI Installation"",""authors"":[{""name"":""YasIkeda"",""id"":11809733}],""summary"":""Tutorial about how to add authentication functionalities to your existing ASP.NET Core project using Microsoft.AspNetCore.Identity.UI package"",""contentType"":""Articles"",""docType"":{""name"":""article"",""id"":1},""categories"":[{""name"":""web development | asp.net | howto"",""id"":0}],""tags"":[{""name"":""c#"",""id"":81},{""name"":""asp.net"",""id"":85},{""name"":""javascript"",""id"":87},{""name"":""xml"",""id"":88},{""name"":""css"",""id"":90},{""name"":"".net"",""id"":98},{""name"":""shell"",""id"":661},{""name"":""json"",""id"":997},{""name"":""text"",""id"":1351},{""name"":""svg"",""id"":1618},{""name"":""vs2013"",""id"":2768},{""name"":""markdown"",""id"":3875},{""name"":""asp.net-core"",""id"":4216},{""name"":"".net-core"",""id"":4272}],""license"":{""name"":""CPOL"",""id"":0},""createdDate"":""2018-11-10T08:02:00Z"",""modifiedDate"":""2018-11-10T08:02:00Z"",""threadEditor"":{""name"":""Deeksha Shenoy"",""id"":3866010},""threadModifiedDate"":""2018-11-10T08:02:00Z"",""rating"":5.0,""votes"":4,""popularity"":3.0103,""websiteLink"":""//www.codeproject.com/Articles/1265638/ASP-NET-Core-Authentication-UI-Installation"",""apiLink"":"""",""parentId"":0,""threadId"":0,""indentLevel"":0},{""id"":""2_1217168"",""title"":""Utilities for Enumeration Field Attribute"",""authors"":[{""name"":""YasIkeda"",""id"":11809733}],""summary"":""Enumeration fields typically require a mapping to keys and human-friendly names when being displayed on UI or output to some persistence"",""contentType"":""Articles"",""docType"":{""name"":""article"",""id"":1},""categories"":[{""name"":""languages | c# | enumerations"",""id"":0}],""tags"":[{""name"":""c#"",""id"":81},{""name"":""xml"",""id"":88},{""name"":"".net"",""id"":98},{""name"":""dev"",""id"":118},{""name"":""intermediate"",""id"":153},{""name"":""json"",""id"":997},{""name"":""vs2013"",""id"":2768},{""name"":""code-quality"",""id"":3699}],""license"":{""name"":""CPOL"",""id"":0},""createdDate"":""2018-06-25T18:22:00Z"",""modifiedDate"":""2018-07-11T14:30:00Z"",""threadEditor"":{""name"":""YasIkeda"",""id"":11809733},""threadModifiedDate"":""2018-07-11T14:30:00Z"",""rating"":1.923077,""votes"":4,""popularity"":0.9304563,""websiteLink"":""//www.codeproject.com/Articles/1217168/Utilities-for-Enumeration-Field-Attribute"",""apiLink"":"""",""parentId"":0,""threadId"":0,""indentLevel"":0}]}";
        const string validGetMyProfileResponse = @"{
  ""id"": 1,
  ""userName"": ""sample string 2"",
  ""displayName"": ""sample string 3"",
  ""avatar"": ""sample string 4"",
  ""email"": ""sample string 5"",
  ""htmlEmails"": true,
  ""country"": ""sample string 7"",
  ""homePage"": ""sample string 8"",
  ""codeProjectMemberId"": 9,
  ""memberProfilePageUrl"": ""sample string 10"",
  ""twitterName"": ""sample string 11"",
  ""googlePlusProfile"": ""sample string 12"",
  ""linkedInProfileUrl"": ""sample string 13"",
  ""biography"": ""sample string 14"",
  ""company"": ""sample string 15"",
  ""jobTitle"": ""sample string 16""
}";

        ILoggerFactory _loggerFactory;
        ILogger _logger;

        [OneTimeSetUp]
        public void SetUp()
        {
            _loggerFactory = new LoggerFactory()
                .AddSerilog();
            _logger = _loggerFactory.CreateLogger<CodeProjectApiServiceTest>();
            //Environment.SetEnvironmentVariable("CPP", "test-admin");
        }

        //[Test]
        public async Task TestGetArticle()
        {
            var cpSiteService = new CodeProjectSiteService(
                _loggerFactory.CreateLogger<CodeProjectSiteService>(),
                new HAPDocumentFactory());
            var cpApiService = new CodeProjectApiService(
                _loggerFactory.CreateLogger<CodeProjectApiService>(),
                new HttpWebRequestFactory(),
                cpSiteService);
            var posts = await cpApiService.GetMyArticles(1);

            _logger.LogInformation($"Views: {posts[0].Views}, Downloads: {posts[0].Downloads}, Bookmarked: {posts[0].Bookmarked}");

            Assert.That(posts, Is.Not.Null, "Code Project API v1/My/Articles should respond.");
            Assert.That(posts, Has.Count.GreaterThan(0), "Code Project API v1/My/Articles should contains more than one article.");
            Assert.That(posts[0].Link, Is.Not.Null.And.Not.Empty, "Article data in the response from Code Project API v1/My/Articles should have the URL to the article");
            Assert.That(posts[0].Views, Is.Not.Null.And.Not.Empty);
            Assert.That(posts[0].Downloads, Is.Not.Null.And.Not.Empty);
            Assert.That(posts[0].Bookmarked, Is.Not.Null.And.Not.Empty);
        }

        [Test]
        public async Task TestGetArticleWithRetry()
        {
            var reqCount = 0;

            var webRequestfactoryMock = new Mock<IHttpWebRequestFactory>();
            webRequestfactoryMock.Setup(x => x.Create(It.IsAny<Uri>()))
                .Returns<Uri>(url =>
                {
                    reqCount++;

                    var reqStream = new MemoryStream();
                    var reqMock = new Mock<IHttpWebRequest>();
                    reqMock.Setup(x => x.RequestUri).Returns(url);
                    reqMock.Setup(x => x.Request).Returns(null as HttpWebRequest);
                    reqMock.Setup(x => x.GetRequestStream()).Returns(() => reqStream);
                    if (url.AbsoluteUri.EndsWith("/token"))
                    {
                        if (reqCount < 3)
                            reqMock.Setup(x => x.GetResponseAsync())
                                .Throws(new TestCPWebException(
                                        HttpStatusCode.NotFound,
                                        "This is a test response."));
                        else
                        {
                            reqMock.Setup(x => x.GetResponseAsync()).Returns(
                                async () =>
                                {
                                    var resMock = new Mock<IHttpWebResponse>();
                                    resMock.Setup(x => x.ResponseUri).Returns(url);
                                    resMock.Setup(x => x.StatusCode).Returns(HttpStatusCode.OK);
                                    resMock.Setup(x => x.ContentType).Returns("application/json; charset=UTF-8");
                                    resMock.Setup(x => x.LastModified).Returns(DateTime.UtcNow);
                                    resMock.Setup(x => x.GetResponseStream()).Returns(() =>
                                    {
                                        var resStream = new MemoryStream();
                                        var w = new StreamWriter(resStream);
                                        w.Write(validTokenApiResponse);
                                        w.Flush();
                                        resStream.Position = 0;
                                        return resStream;
                                    });
                                    return resMock.Object;
                                });

                            reqCount = 0;
                        }
                    }
                    else
                    {
                        if (reqCount < 4)
                            reqMock.Setup(x => x.GetResponseAsync()).Throws(new TestCPWebException(
                                HttpStatusCode.NotFound,
                                "This is a test response."));
                        else
                            reqMock.Setup(x => x.GetResponseAsync()).Returns(
                                async () =>
                                {

                                    var resMock = new Mock<IHttpWebResponse>();
                                    resMock.Setup(x => x.ResponseUri).Returns(url);
                                    resMock.Setup(x => x.StatusCode).Returns(HttpStatusCode.OK);
                                    resMock.Setup(x => x.ContentType).Returns("application/json; charset=UTF-8");
                                    resMock.Setup(x => x.LastModified).Returns(DateTime.UtcNow);
                                    resMock.Setup(x => x.GetResponseStream()).Returns(() =>
                                    {
                                        var resStream = new MemoryStream();
                                        var w = new StreamWriter(resStream);
                                        w.Write(validGetMyArticlesResponse);
                                        w.Flush();
                                        resStream.Position = 0;
                                        reqCount = 0;
                                        return resStream;
                                    });
                                    return resMock.Object;
                                });
                    }
                    return reqMock.Object;
                });

            var hapDocFactory = new Mock<IHAPDocumentFactory>();
            hapDocFactory.Setup(x => x.LoadAsync(It.IsAny<Uri>())).Returns<Uri>(async url =>
            {
                var doc = new HtmlDocument();
                doc.LoadHtml(@"
<html>
    <head>
        <title>Test Data</title>
    </head>
    <body>
        <div class='stats'>
            <div class='stats'>
                <div>1K views</div>
                <div>123 downloads</div>
                <div>89 bookmarked</div>
            </div>
        </div>
    </body>
</html>
");
                return new HAPHtmlDocumentWrapper(doc);
            });

            var cpSiteService = new CodeProjectSiteService(
                _loggerFactory.CreateLogger<CodeProjectSiteService>(),
                hapDocFactory.Object);
            var cpApiService = new CodeProjectApiService(
                _loggerFactory.CreateLogger<CodeProjectApiService>(),
                webRequestfactoryMock.Object,
                cpSiteService);
            var posts = await cpApiService.GetMyArticles(1);

            Assert.That(posts, Is.Not.Null);
            Assert.That(posts, Has.Count.GreaterThan(0));
            Assert.That(posts[0].Link, Is.EqualTo("https://www.codeproject.com/Articles/1265638/ASP-NET-Core-Authentication-UI-Installation"));
            Assert.That(posts[0].Views, Is.EqualTo("1K"));
            Assert.That(posts[0].Downloads, Is.EqualTo("123"));
            Assert.That(posts[0].Bookmarked, Is.EqualTo("89"));
        }

        [Test]
        public async Task TestTokenApiNotFound()
        {
            var webRequestfactoryMock = new Mock<IHttpWebRequestFactory>();
            webRequestfactoryMock.Setup(x => x.Create(It.IsAny<Uri>()))
                .Returns<Uri>(url =>
                {
                    var reqStream = new MemoryStream();
                    var reqMock = new Mock<IHttpWebRequest>();
                    reqMock.Setup(x => x.RequestUri).Returns(url);
                    reqMock.Setup(x => x.Request).Returns(null as HttpWebRequest);
                    reqMock.Setup(x => x.GetRequestStream()).Returns(() => reqStream);
                    reqMock.Setup(x => x.GetResponseAsync()).Throws(new TestCPWebException(
                        HttpStatusCode.NotFound,
                        "This is a test response."));
                    return reqMock.Object;
                });

            var hapDocFactory = new Mock<IHAPDocumentFactory>();

            var cpSiteService = new CodeProjectSiteService(
                _loggerFactory.CreateLogger<CodeProjectSiteService>(),
                hapDocFactory.Object);
            var cpApiService = new CodeProjectApiService(
                _loggerFactory.CreateLogger<CodeProjectApiService>(),
                webRequestfactoryMock.Object,
                cpSiteService);
            try
            {
                var posts = await cpApiService.GetMyArticles(1);
            }
            catch (Exception e)
            {
                Assert.That(e, Is.TypeOf<CodeProjectApiService.ApiMethodNotFoundException>());
                Assert.That(e.Message, Is.EqualTo("Token API method was not found at Code Project API endpoint. (URL: https://api.codeproject.com/token, Status: NotFound, Response: This is a test response.)"));
                const string expectedStackTraceStartsWith = "   at YCodeLab.Services.CodeProjectApiService.InnerGetApiCredential(GrantType grantType, Int32 retryCounter)";
                Assert.That(e.StackTrace.Substring(0, expectedStackTraceStartsWith.Length), Is.EqualTo(expectedStackTraceStartsWith));
            }
        }

        [Test]
        public async Task TestInvalidCredential()
        {
            var webRequestfactoryMock = new Mock<IHttpWebRequestFactory>();
            webRequestfactoryMock.Setup(x => x.Create(It.IsAny<Uri>()))
                .Returns<Uri>(url =>
                {
                    var reqStream = new MemoryStream();
                    var reqMock = new Mock<IHttpWebRequest>();
                    reqMock.Setup(x => x.RequestUri).Returns(url);
                    reqMock.Setup(x => x.Request).Returns(null as HttpWebRequest);
                    reqMock.Setup(x => x.GetRequestStream()).Returns(() => reqStream);
                    reqMock.Setup(x => x.GetResponseAsync()).Throws(new TestCPWebException(
                        HttpStatusCode.BadRequest,
                        "This is a test response."));
                    return reqMock.Object;
                });

            var hapDocFactory = new Mock<IHAPDocumentFactory>();

            var cpSiteService = new CodeProjectSiteService(
                _loggerFactory.CreateLogger<CodeProjectSiteService>(),
                hapDocFactory.Object);
            var cpApiService = new CodeProjectApiService(
                _loggerFactory.CreateLogger<CodeProjectApiService>(),
                webRequestfactoryMock.Object,
                cpSiteService);
            try
            {
                var posts = await cpApiService.GetMyArticles(1);
            }
            catch (Exception e)
            {
                Assert.That(e, Is.TypeOf<CodeProjectApiService.InvalidCredentialException>());
                Assert.That(e.Message, Is.EqualTo("Authentication failed. Credential needs to be confirmed. (URL: https://api.codeproject.com/token, Status: BadRequest, Response: This is a test response.)"));
                const string expectedStackTraceStartsWith = "   at YCodeLab.Services.CodeProjectApiService.InnerGetApiCredential(GrantType grantType, Int32 retryCounter)";
                Assert.That(e.StackTrace.Substring(0, expectedStackTraceStartsWith.Length), Is.EqualTo(expectedStackTraceStartsWith));
            }
        }

        [Test]
        public async Task TestTokenApiWithUnexpectedResponse()
        {
            var webRequestfactoryMock = new Mock<IHttpWebRequestFactory>();
            webRequestfactoryMock.Setup(x => x.Create(It.IsAny<Uri>()))
                .Returns<Uri>(url =>
                {
                    var reqStream = new MemoryStream();
                    var reqMock = new Mock<IHttpWebRequest>();
                    reqMock.Setup(x => x.RequestUri).Returns(url);
                    reqMock.Setup(x => x.Request).Returns(null as HttpWebRequest);
                    reqMock.Setup(x => x.GetRequestStream()).Returns(() => reqStream);
                    reqMock.Setup(x => x.GetResponseAsync()).Returns(async () =>
                    {
                        var resMock = new Mock<IHttpWebResponse>();
                        resMock.Setup(x => x.ResponseUri).Returns(url);
                        resMock.Setup(x => x.StatusCode).Returns(HttpStatusCode.OK);
                        resMock.Setup(x => x.ContentType).Returns("application/json; charset=UTF-8");
                        resMock.Setup(x => x.LastModified).Returns(DateTime.UtcNow);
                        resMock.Setup(x => x.GetResponseStream()).Returns(() =>
                        {
                            var resStream = new MemoryStream();
                            var w = new StreamWriter(resStream);
                            w.Write("{}");
                            w.Flush();
                            resStream.Position = 0;
                            return resStream;
                        });
                        return resMock.Object;
                    });
                    return reqMock.Object;
                });

            var hapDocFactory = new Mock<IHAPDocumentFactory>();

            var cpSiteService = new CodeProjectSiteService(
                _loggerFactory.CreateLogger<CodeProjectSiteService>(),
                hapDocFactory.Object);
            var cpApiService = new CodeProjectApiService(
                _loggerFactory.CreateLogger<CodeProjectApiService>(),
                webRequestfactoryMock.Object,
                cpSiteService);
            try
            {
                var posts = await cpApiService.GetMyArticles(1);
            }
            catch (Exception e)
            {
                Assert.That(e, Is.TypeOf<CodeProjectApiService.ApiMethodResponseInUnexpectedFormatException>());
                Assert.That(e.Message, Is.EqualTo("The response from Code Project Token API was not in the expected format. (URL: https://api.codeproject.com/token, Status: OK, Response: {})"));
                const string expectedStackTraceStartsWith = "   at YCodeLab.Services.CodeProjectApiService.InnerGetApiCredential(GrantType grantType, Int32 retryCounter)";
                Assert.That(e.StackTrace.Substring(0, expectedStackTraceStartsWith.Length), Is.EqualTo(expectedStackTraceStartsWith));
            }
        }

        [Test]
        public async Task TestTokenApiWithUnexpectedHttpResponse()
        {
            var webRequestfactoryMock = new Mock<IHttpWebRequestFactory>();
            webRequestfactoryMock.Setup(x => x.Create(It.IsAny<Uri>()))
                .Returns<Uri>(url =>
                {
                    var reqStream = new MemoryStream();
                    var reqMock = new Mock<IHttpWebRequest>();
                    reqMock.Setup(x => x.RequestUri).Returns(url);
                    reqMock.Setup(x => x.Request).Returns(null as HttpWebRequest);
                    reqMock.Setup(x => x.GetRequestStream()).Returns(() => reqStream);
                    reqMock.Setup(x => x.GetResponseAsync()).Throws(new TestCPWebException(
                        HttpStatusCode.BadGateway,
                        "This is a test response."));
                    return reqMock.Object;
                });

            var hapDocFactory = new Mock<IHAPDocumentFactory>();

            var cpSiteService = new CodeProjectSiteService(
                _loggerFactory.CreateLogger<CodeProjectSiteService>(),
                hapDocFactory.Object);
            var cpApiService = new CodeProjectApiService(
                _loggerFactory.CreateLogger<CodeProjectApiService>(),
                webRequestfactoryMock.Object,
                cpSiteService);
            try
            {
                var posts = await cpApiService.GetMyArticles(1);
            }
            catch (Exception e)
            {
                Assert.That(e, Is.TypeOf<CodeProjectApiService.CodeProjectApiException>());
                const string expectedStackTraceStartsWith = "   at YCodeLab.Services.CodeProjectApiService.InnerGetApiCredential(GrantType grantType, Int32 retryCounter)";
                Assert.That(e.StackTrace.Substring(0, expectedStackTraceStartsWith.Length), Is.EqualTo(expectedStackTraceStartsWith));
            }
        }

        [Test]
        public async Task TestCaching()
        {
            var reqCount = 0;

            var webRequestfactoryMock = new Mock<IHttpWebRequestFactory>();
            webRequestfactoryMock.Setup(x => x.Create(It.IsAny<Uri>()))
                .Returns<Uri>(url =>
                {
                    reqCount++;

                    var reqStream = new MemoryStream();
                    var reqMock = new Mock<IHttpWebRequest>();
                    reqMock.Setup(x => x.RequestUri).Returns(url);
                    reqMock.Setup(x => x.Request).Returns(null as HttpWebRequest);
                    reqMock.Setup(x => x.GetRequestStream()).Returns(() => reqStream);
                    if (url.AbsoluteUri.ToLower().EndsWith("/token"))
                    {
                        if (reqCount < 3)
                            reqMock.Setup(x => x.GetResponseAsync())
                                .Throws(new TestCPWebException(
                                        HttpStatusCode.NotFound,
                                        "This is a test response."));
                        else
                        {
                            reqMock.Setup(x => x.GetResponseAsync()).Returns(
                                async () =>
                                {
                                    await Task.Delay(1000);

                                    var resMock = new Mock<IHttpWebResponse>();
                                    resMock.Setup(x => x.ResponseUri).Returns(url);
                                    resMock.Setup(x => x.StatusCode).Returns(HttpStatusCode.OK);
                                    resMock.Setup(x => x.ContentType).Returns("application/json; charset=UTF-8");
                                    resMock.Setup(x => x.LastModified).Returns(DateTime.UtcNow);
                                    resMock.Setup(x => x.GetResponseStream()).Returns(() =>
                                    {
                                        var resStream = new MemoryStream();
                                        var w = new StreamWriter(resStream);
                                        w.Write(validTokenApiResponse);
                                        w.Flush();
                                        resStream.Position = 0;
                                        return resStream;
                                    });
                                    return resMock.Object;
                                });

                            reqCount = 0;
                        }
                    }
                    else if (url.AbsolutePath.ToLower().EndsWith("/profile"))
                    {
                        if (reqCount < 4)
                            reqMock.Setup(x => x.GetResponseAsync()).Throws(new TestCPWebException(
                                HttpStatusCode.NotFound,
                                "This is a test response."));
                        else
                            reqMock.Setup(x => x.GetResponseAsync()).Returns(
                                async () =>
                                {
                                    //await Task.Delay(1000);

                                    var resMock = new Mock<IHttpWebResponse>();
                                    resMock.Setup(x => x.ResponseUri).Returns(url);
                                    resMock.Setup(x => x.StatusCode).Returns(HttpStatusCode.OK);
                                    resMock.Setup(x => x.ContentType).Returns("application/json; charset=UTF-8");
                                    resMock.Setup(x => x.LastModified).Returns(DateTime.UtcNow);
                                    resMock.Setup(x => x.GetResponseStream()).Returns(() =>
                                    {
                                        var resStream = new MemoryStream();
                                        var w = new StreamWriter(resStream);
                                        w.Write(validGetMyProfileResponse);
                                        w.Flush();
                                        resStream.Position = 0;
                                        reqCount = 0;
                                        return resStream;
                                    });
                                    return resMock.Object;
                                });
                    }
                    else
                    {
                        if (reqCount < 4)
                            reqMock.Setup(x => x.GetResponseAsync()).Throws(new TestCPWebException(
                                HttpStatusCode.NotFound,
                                "This is a test response."));
                        else
                            reqMock.Setup(x => x.GetResponseAsync()).Returns(
                                async () =>
                                {
                                    //await Task.Delay(1000);

                                    var resMock = new Mock<IHttpWebResponse>();
                                    resMock.Setup(x => x.ResponseUri).Returns(url);
                                    resMock.Setup(x => x.StatusCode).Returns(HttpStatusCode.OK);
                                    resMock.Setup(x => x.ContentType).Returns("application/json; charset=UTF-8");
                                    resMock.Setup(x => x.LastModified).Returns(DateTime.UtcNow);
                                    resMock.Setup(x => x.GetResponseStream()).Returns(() =>
                                    {
                                        var resStream = new MemoryStream();
                                        var w = new StreamWriter(resStream);
                                        w.Write(validGetMyArticlesResponse);
                                        w.Flush();
                                        resStream.Position = 0;
                                        reqCount = 0;
                                        return resStream;
                                    });
                                    return resMock.Object;
                                });
                    }
                    return reqMock.Object;
                });

            var hapDocFactory = new Mock<IHAPDocumentFactory>();
            hapDocFactory.Setup(x => x.LoadAsync(It.IsAny<Uri>())).Returns<Uri>(async url =>
            {
                var doc = new HtmlDocument();
                doc.LoadHtml(@"
<html>
    <head>
        <title>Test Data</title>
    </head>
    <body>
        <div class='stats'>
            <div class='stats'>
                <div>1K views</div>
                <div>123 downloads</div>
                <div>89 bookmarked</div>
            </div>
        </div>
    </body>
</html>
");
                return new HAPHtmlDocumentWrapper(doc);
            });

            var cpSiteService = new CodeProjectSiteService(
                _loggerFactory.CreateLogger<CodeProjectSiteService>(),
                hapDocFactory.Object);
            var cpApiService = new CodeProjectApiService(
                _loggerFactory.CreateLogger<CodeProjectApiService>(),
                webRequestfactoryMock.Object,
                cpSiteService);

            var cancel = new CancellationToken();
            await cpApiService.StartAsync(cancel);

            ICodeProjectApiService.ICodeProjectInfo data1 = null;
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            while (data1 == null)
            {
                if (stopwatch.Elapsed.TotalSeconds > 10d)
                    break;
                await Task.Delay(500);
                data1 = cpApiService.Cache;
            }

            Assert.That(data1, Is.Not.Null);
            Assert.That(data1.MyArticles, Has.Count.GreaterThan(0));

            ICodeProjectApiService.ICodeProjectInfo data2 = data1;
            stopwatch.Restart();
            while (data2 == data1)
            {
                if (stopwatch.Elapsed.TotalSeconds > 15d)
                    break;
                await Task.Delay(500);
                data2 = cpApiService.Cache;
            }

            Assert.That(data2, Is.Not.SameAs(data1));
            Assert.That(data2.MyArticles, Has.Count.GreaterThan(0));

            await cpApiService.StopAsync(cancel);
        }
    }
}
