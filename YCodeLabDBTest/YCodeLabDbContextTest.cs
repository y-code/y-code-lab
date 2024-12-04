using System;
using System.Linq;
using NUnit.Framework;
using YCodeLab.DB.Messaging;
using YCodeLab.DBFactory;

namespace YCodeLab.DB.Test
{
    [TestFixture]
    public class YCodeLabDbContextTest
    {
        [Test]
        public void TestMessageCreatedTime()
        {
            var timeStamp = DateTime.UtcNow;
            long? id = null;
            {
                var dbContextFactory = new YCodeLabDbContextFactory();
                using var context = dbContextFactory.CreateDbContext();
                var message = new Message
                {
                    CreatedTime = DateTime.UtcNow + TimeSpan.FromHours(1),
                };
                context.Set<Message>().Add(message);
                timeStamp = DateTime.UtcNow;
                context.SaveChanges();
                id = message.Id;
            }
            {
                var dbContextFactory = new YCodeLabDbContextFactory();
                using var context = dbContextFactory.CreateDbContext();
                var message = context.Set<Message>()
                    .FirstOrDefault(e => e.Id == id);
                Assert.That(message?.CreatedTime, Is.GreaterThan(timeStamp).And.LessThan(timeStamp + TimeSpan.FromSeconds(3)),
                    "The stored new message should have create_time the time right after the time stamp taken right before DbContext.SaveChanges method call.");
            }
        }
    }
}
