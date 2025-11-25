using System;
using NUnit.Framework;
using Serilog;

namespace YCodeLab.Test
{
    [SetUpFixture]
    public class TestSetUp
    {
        [OneTimeSetUp]
        public void SetUp()
        {
            Log.Logger = new LoggerConfiguration()
                .WriteTo.Console()
                .MinimumLevel.Debug()
                .CreateLogger();
        }
    }
}
