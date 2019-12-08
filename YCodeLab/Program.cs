using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Serilog;

namespace YCodeLab
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .WriteTo.Console()
                .CreateLogger();
            var logger = Log.Logger.ForContext<Program>();

            var port = Environment.GetEnvironmentVariable("PORT");

            var webHost = WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseSerilog((webHostBuilderContext, loggerConfiguration) =>
                {
                    loggerConfiguration
                        .ReadFrom.Configuration(webHostBuilderContext.Configuration);
                });

            if (!string.IsNullOrEmpty(port))
                webHost.UseUrls($"http://+:{port}");

            logger.Information($"**1 {webHost.GetSetting(WebHostDefaults.ServerUrlsKey)}");
            logger.Information($"**2 {Environment.GetEnvironmentVariable("ASPNETCORE_URLS")}");

            webHost
                .Build()
                .Run();
        }
    }
}
