using System;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using YCodeLab.DB;
using YCodeLab.Models;
using YCodeLab.Services;
using YCodeLab.Services.HtmlAgilityPack;
using YCodeLab.Services.Net;

namespace YCodeLab
{
    public class Startup
    {
        ILogger<Startup> _logger;

        public Startup(IConfiguration configuration, ILogger<Startup> logger)
        {
            Configuration = configuration;
            _logger = logger;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddResponseCaching();

            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddSingleton<IHttpWebRequestFactory, HttpWebRequestFactory>();
            services.AddSingleton<IHAPDocumentFactory, HAPDocumentFactory>();
            services.AddSingleton<ICodeProjectApiService, CodeProjectApiService>();
            services.AddHostedService(p => p.GetService<ICodeProjectApiService>());
            services.AddSingleton<CodeProjectSiteService>();

            services.AddEntityFrameworkNpgsql();
            services.AddDbContext<YCodeLabDbContext>((serviceProvider, optionsBuilder) =>
            {
                var conn = Configuration.GetConnectionString("ycodelab-db");
                if (string.IsNullOrEmpty(conn))
                    conn = Environment.GetEnvironmentVariable("Y_CODE_LAB_DB");
                _logger.LogInformation("Database: {Database}", conn);
                ((DbContextOptionsBuilder<YCodeLabDbContext>)optionsBuilder)
                    .UseNpgsql(conn);
            });

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = context =>
                {
                    var result = new BadRequestObjectResult(new
                    {
                        Status = ApiResponseStatus.Failure,
                        Errors = context.ModelState.ToDictionary(
                            p => string.IsNullOrEmpty(p.Key) ? p.Key : p.Key[0].ToString().ToLower() + p.Key.Substring(1),
                            p => p.Value),
                    });
                    return result;
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseResponseCaching();
            app.Use(async (context, next) =>
            {
                var headers = context.Response.GetTypedHeaders();
                headers.CacheControl
                    = new Microsoft.Net.Http.Headers.CacheControlHeaderValue
                    {
                        Public = true,
                        NoCache = true,
                        MaxAge = TimeSpan.FromSeconds(10),
                        MustRevalidate = true,
                        NoTransform = true,
                    };
                headers.Expires
                    = new DateTimeOffset(DateTime.Now + TimeSpan.FromSeconds(10));
                await next();
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles(new StaticFileOptions
            {
                OnPrepareResponse = response =>
                {
                    var headers = response.Context.Response.GetTypedHeaders();
                    headers.CacheControl = new Microsoft.Net.Http.Headers.CacheControlHeaderValue
                    {
                        Public = true,
                        NoCache = true,
                        MaxAge = TimeSpan.FromSeconds(10),
                        MustRevalidate = true,
                        NoTransform = true,
                    };
                    headers.Expires
                        = new DateTimeOffset(DateTime.Now + TimeSpan.FromSeconds(10));
                }
            });

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
