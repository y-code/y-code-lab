using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YCodeLab.DB.Messaging;
using YCodeLab.DB.Resume;

namespace YCodeLab.DB
{
    public class YCodeLabDbContext : DbContext
    {
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<Company> Companies { get; set; }

        public DbSet<Message> Messages { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public YCodeLabDbContext(DbContextOptions<YCodeLabDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Profile>();
            modelBuilder.Entity<Experience>();
            modelBuilder.Entity<Company>();

            modelBuilder.Entity<Message>();
            modelBuilder.Entity<Comment>()
                .HasIndex(e => e.category);
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
