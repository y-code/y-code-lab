using YCodeLab.DB;

namespace YCodeLab.DBFactory
{
    public class YCodeLabDbContextFactory : DbContextFactory<YCodeLabDbContext>
    {
        public override YCodeLabDbContext CreateDbContext(params string[] args)
            => new YCodeLabDbContext(optionsBuilder.Options);
    }
}
