using System;
using System.ComponentModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Npgsql;
using Microsoft.Extensions.Configuration;
using YCodeLab.DB;

namespace YCodeLab.DBFactory;

public class YCodeLabDbContextFactory : IDesignTimeDbContextFactory<YCodeLabDbContext>, IDbContextFactory<YCodeLabDbContext>
{
    private readonly string[] _args = [];
    
    public YCodeLabDbContextFactory() { }

    public YCodeLabDbContextFactory(string[] args)
    {
        _args = args;
    }
    
    public YCodeLabDbContext CreateDbContext(params string[] args)
    {
        string? connStr = args.Length > 0 ? args[0] : null;
        
        var environment = Environment.GetEnvironmentVariable("DB_ENVIRONMENT");
        if (string.IsNullOrEmpty(environment))
            throw new Exception("Environment variable DB_ENVIRONMENT is not specified.");

        var config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .AddJsonFile($"appsettings.{environment}.json")
            .Build();
        connStr ??= config.GetConnectionString("ycodelab-db");
        var connUri = config.GetConnectionString("ycodelab-db-uri");
        if (connUri is not null)
        {
            var oConnUri =  new Uri(connUri);
            var userInfo = oConnUri.UserInfo.Split(':');
            connStr = new NpgsqlConnectionStringBuilder
            {
                Host = oConnUri.Host,
                Port = oConnUri.Port,
                Username = userInfo[0],
                Password = userInfo[1],
                Database = oConnUri.AbsolutePath.TrimStart('/'),
                SslMode = SslMode.Require,
                MaxPoolSize = 30,
                Timeout = 15,
                CommandTimeout = 15,
            }.ToString();
        }
        
        if (connStr is null)
            throw new InvalidEnumArgumentException("No database connection information provided.");

        Console.WriteLine($"Using a database connected with {connStr}");
        
        var optionsBuilder = new DbContextOptionsBuilder<YCodeLabDbContext>()
            .UseNpgsql(connStr);
        return new YCodeLabDbContext(optionsBuilder.Options);
    }

    public YCodeLabDbContext CreateDbContext()
    {
        return CreateDbContext(_args);
    }
}
