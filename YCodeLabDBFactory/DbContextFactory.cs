using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace YCodeLab.DBFactory
{
    public abstract class DbContextFactory<T> : IDesignTimeDbContextFactory<T> where T : DbContext
    {
        protected readonly DbContextOptionsBuilder<T> optionsBuilder;

        public DbContextFactory()
        {
            var environment = Environment.GetEnvironmentVariable("DB_ENVIRONMENT");
            if (string.IsNullOrEmpty(environment))
                throw new Exception("Environment variable DB_ENVIRONMENT is not specified.");

            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddJsonFile($"appsettings.{environment}.json")
                .Build();
            var connStr = config.GetConnectionString("ycodelab-db");
            optionsBuilder = new DbContextOptionsBuilder<T>()
                .UseNpgsql(connStr);
        }

        public abstract T CreateDbContext(params string[] args);
    }
}
