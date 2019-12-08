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
            var dbContextFactory = new YCodeLabDbContextFactory();
            var context = dbContextFactory.CreateDbContext();
            var message = new Message
            {
                CreatedTime = DateTime.UtcNow + TimeSpan.FromHours(1),
            };
            context.Messages.Add(message);
            var timeStamp = DateTime.UtcNow;
            context.SaveChanges();

            var dbContextFactory2 = new YCodeLabDbContextFactory();
            var context2 = dbContextFactory2.CreateDbContext();
            var message2 = context2.Messages
                .FirstOrDefault(e => e.Id == message.Id);

            Assert.That(message2.CreatedTime, Is.GreaterThan(timeStamp).And.LessThan(timeStamp + TimeSpan.FromSeconds(3)),
                "The stored new message should have create_time the time right after the time stamp taken right before DbContext.SaveChanges method call.");
        }
    }
}
