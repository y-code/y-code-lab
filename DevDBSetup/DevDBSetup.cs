using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using NDesk.Options;
using Serilog;
using Serilog.Extensions.Logging;
using YCodeLab.DBFactory;
using YCodeLab.DevDBSetup.RecipeManagement;

namespace YCodeLab.DevDBSetup
{
    public class DevDBSetup
    {
        public static ILoggerFactory LoggerFactory { get; private set; }

        public static int Main(params string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .WriteTo.Console()
                .MinimumLevel.Debug()
                .CreateLogger();
            LoggerFactory = new SerilogLoggerFactory();
            var logger = LoggerFactory.CreateLogger("Main");

            var settings = new AppSettings();
            var isHelpDocRequested = false;
            var options = new OptionSet
            {
                { "s|script=", "Script file to run before setting up data.", v => settings.ScriptBeforeSetup = v },
                { "h|?|help", "Show command line help.", v => isHelpDocRequested = v != null },
            };

            var optionArgs = new List<string>();
            var commandArgs = new List<string>();
            var isAfterSeparator = false;
            foreach (var arg in args)
            {
                if (isAfterSeparator)
                    commandArgs.Add(arg);
                else
                {
                    if (arg == "--")
                        isAfterSeparator = true;
                    else
                        optionArgs.Add(arg);
                }
            }

            options.Parse(optionArgs);
            settings.ArgsForScriptBeforeSetup = commandArgs.DefaultIfEmpty().Aggregate((a, b) => $"{a} {b}");

            if (isHelpDocRequested)
            {
                using (var stream = new MemoryStream())
                using (var writer = new StreamWriter(stream))
                using (var reader = new StreamReader(stream))
                {
                    options.WriteOptionDescriptions(writer);
                    writer.Flush();
                    stream.Position = 0;
                    var helpDoc = reader.ReadToEnd();
                    Console.WriteLine($"options:\n{helpDoc}\n"
                        + "  --                         Parameters after it will be passed to the script.");
                }
                return 0;
            }

            logger.LogInformation("DevDBSetup is starting...");

            var devDBSetup = new DevDBSetup(settings, LoggerFactory.CreateLogger<DevDBSetup>());
            try
            {
                devDBSetup.Run();
            }
            catch (Exception)
            {
                return 1;
            }
            return 0;
        }

        private readonly AppSettings _settings;
        private readonly Microsoft.Extensions.Logging.ILogger _logger;
        private readonly YCodeLabDummyDataProvider<YCodeLabDbContextFactory> _dataProvider;

        public DevDBSetup(AppSettings settings, Microsoft.Extensions.Logging.ILogger logger)
        {
            _logger = logger;
            _settings = settings;
            var dbContextFactory = new YCodeLabDbContextFactory();
            _dataProvider = new YCodeLabDummyDataProvider<YCodeLabDbContextFactory>(dbContextFactory, LoggerFactory.CreateLogger<YCodeLabDummyDataProvider<YCodeLabDbContextFactory>>());
        }

        public void Run()
        {
            var dbEnvironment = Environment.GetEnvironmentVariable("DB_ENVIRONMENT");
            if (dbEnvironment != "Development")
            {
                var e = new Exception("DevDBSetup will do nothing because DB environment is not 'Development'.");
                _logger.LogWarning(e.Message);
                throw e;
            }

            if (!string.IsNullOrEmpty(_settings.ScriptBeforeSetup))
            {
                try
                {
                    RunScript();
                }
                catch (Exception e)
                {
                    _logger.LogError(e.Message);
                    _logger.LogInformation("Will not run the database setup.");
                    throw e;
                }
            }

            Setup();

            _logger.LogInformation("Completed");
        }

        public void RunScript()
        {
            _logger.LogInformation("Running the preprocess command...");

            string lastLine = "";

            using (var process = new Process()
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = _settings.ScriptBeforeSetup,
                    Arguments = _settings.ArgsForScriptBeforeSetup,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true,
                }
            })
            {
                process.Start();

                var cancel = new CancellationTokenSource();
                var stdOutTask = Task.Run(() =>
                {
                    while (true)
                    {
                        if (process.StandardOutput.EndOfStream)
                        {
                            if (cancel.Token.IsCancellationRequested)
                                break;
                            Thread.Sleep(300);
                            continue;
                        }
                        var stdOut = process.StandardOutput.ReadLine();
                        lastLine = stdOut;
                        _logger.LogDebug(stdOut);
                    }
                }, cancel.Token);
                var stdErrTask = Task.Run(() =>
                {
                    while (true)
                    {
                        if (process.StandardError.EndOfStream)
                        {
                            if (cancel.Token.IsCancellationRequested)
                                break;
                            Thread.Sleep(300);
                            continue;
                        }
                        var stdOut = process.StandardError.ReadLine();
                        _logger.LogError(stdOut);
                    }
                }, cancel.Token);

                process.WaitForExit();
                cancel.Cancel();
                Task.WaitAll(stdOutTask, stdErrTask);
            }

            if (new Regex(@"(\[.*\]\s*)?Completed").IsMatch(lastLine))
            {
                _logger.LogInformation("Completed installing the database.");
                return;
            }

            throw new Exception("Failed to install the database.");
        }

        public void Setup()
        {
            _logger.LogInformation("Setting up data...");

            try
            {
                _dataProvider.SetupData();
            }
            catch (Exception e)
            {
                _logger.LogError(e.ToString());
            }
        }
    }
}
