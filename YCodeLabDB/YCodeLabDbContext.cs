using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YCodeLab.DB.Messaging;

namespace YCodeLab.DB
{
    public class YCodeLabDbContext : DbContext
    {
        public YCodeLabDbContext(DbContextOptions<YCodeLabDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new MessageEntityConfig());
            modelBuilder.ApplyConfiguration(new CommentEntityConfig());
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            PrepareEntitiesBeforeSave();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            PrepareEntitiesBeforeSave();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void PrepareEntitiesBeforeSave()
        {
            foreach (var entry in ChangeTracker.Entries<Message>())
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedTime = DateTime.UtcNow;
                }
            }
        }
    }
}
