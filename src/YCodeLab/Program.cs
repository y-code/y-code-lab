using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Serilog;

namespace YCodeLab
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var port = Environment.GetEnvironmentVariable("PORT");

            Log.Logger = new LoggerConfiguration()
                .WriteTo.Console()
                .CreateLogger();

            var webHostBuilder = WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseSerilog((webHostBuilderContext, loggerConfiguration) =>
                {
                    loggerConfiguration
                        .ReadFrom.Configuration(webHostBuilderContext.Configuration);
                });

            if (!string.IsNullOrEmpty(port))
                webHostBuilder.UseUrls($"http://+:{port}");


            Log.Logger.Information("PORT: {Port}", port);
            //Log.Logger.Information("ASPNETCORE_URLS: {Port}", Environment.GetEnvironmentVariable("ASPNETCORE_URLS"));
            //Log.Logger.Information("Urls setting in WebHost: {Port}", webHostBuilder.GetSetting(WebHostDefaults.ServerUrlsKey));

            webHostBuilder
                .Build()
                .Run();
        }
    }
}
