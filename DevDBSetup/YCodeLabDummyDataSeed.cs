using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using YCodeLab.DB;

namespace YCodeLab.DevDBSetup;

public class YCodeLabDummyDataSeed<TFactory> : IDataProvider
        where TFactory : IDbContextFactory<YCodeLabDbContext>
{
    private ILogger _logger;
    protected readonly TFactory Factory;

    public YCodeLabDummyDataSeed(TFactory factory, ILogger<YCodeLabDummyDataSeed<TFactory>> logger)
    {
        Factory = factory;
        _logger = logger;
    }

    public void SetupData()
    {
        SetupDataToResumeSchema();
    }

    public void SetupDataToResumeSchema()
    {
        _logger.LogInformation("Seed data to databse...");

        using (var context = Factory.CreateDbContext())
        {
            context.SaveChanges();
        }
    }
}
