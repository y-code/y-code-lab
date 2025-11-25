using System;
using System.IO;
using Microsoft.Extensions.Logging;
using NUnit.Framework;
using Serilog;
using Serilog.Extensions.Logging;

namespace YCodeLab.DB.Test
{
    [SetUpFixture]
    public class TestSetUp
    {
        [OneTimeSetUp]
        public void SetUpBeforeAnyTests()
        {
            var pathToScriptSettingUpDb = TestContext.Parameters["pathToUpdateDevDbScript"];
            if (string.IsNullOrEmpty(pathToScriptSettingUpDb))
                pathToScriptSettingUpDb = "../../../../Scripts/update_dev_db.sh";

            var cd = Directory.GetCurrentDirectory();

            Environment.SetEnvironmentVariable("DB_ENVIRONMENT", "Development");

            Log.Logger = new LoggerConfiguration()
                .WriteTo.Console()
                .MinimumLevel.Debug()
                .CreateLogger();
            var loggerFactory = new SerilogLoggerFactory();

            new DevDBSetup.DevDBSetup(new DevDBSetup.AppSettings
            {
                ScriptBeforeSetup = pathToScriptSettingUpDb,
            }, loggerFactory.CreateLogger<DevDBSetup.DevDBSetup>())
                .Run();
        }
    }
}
