using System;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using YCodeLab.DB;
using YCodeLab.DB.Resume;
using YCodeLab.DBFactory;

namespace YCodeLab.DevDBSetup.RecipeManagement
{
    public class YCodeLabDummyDataProvider<TFactory> : IDataProvider
            where TFactory : DbContextFactory<YCodeLabDbContext>
    {
        private ILogger _logger;
        protected readonly TFactory Factory;

        public YCodeLabDummyDataProvider(TFactory factory, ILogger<YCodeLabDummyDataProvider<TFactory>> logger)
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
            _logger.LogInformation("Setting up data in resume schema...");

            using (var context = Factory.CreateDbContext())
            {
                var company0 = new Company
                {
                    Name = "Verizon Connect",
                };
                var company1 = new Company
                {
                    Name = "FIS",
                };
                var company2 = new Company
                {
                    Name = "Quest-Com",
                };

                var profile0 = new Profile
                {
                    FirstName = "Yasunori",
                    MiddleName = "Jonathan",
                    LastName = "Ikeda",
                    CurrentTitle = "Product Development Engineer",
                    Experiences = new List<Experience>
                    {
                        new Experience
                        {
                            Title = "Senior Product Development Engineer",
                            Company = company0,
                            StartDate = new DateTime(2019, 3, 1),
                            EndDate = null,
                            Description = @"My commitments are: 
‣ API / UI test automation with NUnit,
Selenium, Jest, Enzyme
‣ Test planning and execution
‣ Test case management
‣ Test environment maintenance (RedHat Server)
‣ Design verification
‣ Release management
‣ Development process improvement ‣ Test support tool development with
ASP.NET MVC, ASP.NET Core, WCF, WPF, Entity Framework, NpgSql, Dapper, Castle Windsor, Serilog, RabbitMQ, HttpClient, Google Maps JavaScript API, Bootstrap, React, Angular ",
                        },
                        new Experience
                        {
                            Title = "Senior Quality Assurance Engineer",
                            Company = company0,
                            StartDate = new DateTime(2015, 5, 1),
                            EndDate = new DateTime(2019, 3, 1),
                            Description = @"I have been a QA Automation Engineer embedded to a developer team of 4-5 developers, working independently from the QA team. Afterwards, I was promoted to a Senior role. Responsibilities are the same as my later role above.",
                        },
                        new Experience
                        {
                            Title = "Quality Assurance Engineer",
                            Company = company1,
                            StartDate = new DateTime(2013, 10, 1),
                            EndDate = new DateTime(2015, 5, 1),
                            Description = @"This role was my first work experience in New Zealand. I belonged to a QA team that focuses on design verification from the aspect of accounting.
I analysed and planned the tests for new features or feature changes and executed them.
The QA team had fully automated the regression testing process, and thus test automation and its maintenance were also an essential part of my role. The system’s UI was a window application, and I automated the UI tests in C#. Afterwards, developers migrated the front-end to a SaaS application, so that we also migrated our automated tests using Selenium.",
                        },
                        new Experience
                        {
                            Title = "Business Analyst",
                            Company = company2,
                            StartDate = new DateTime(2011, 3, 1),
                            EndDate = new DateTime(2011, 10, 1),
                            Description = @"I worked as a business analyst in a development project of online trading and accounting platform for brokerage firms in Nomura Research Institute, Ltd (https://www.nri.com/en), which is called THE STAR (https://www.nri.com/en/service/solution/fis/the_star). I was an assistant of the vice chief director.
The project was composed of over 200 business analysts and software engineers, and the supervisory team, which I belonged to, was responsible for supervising the underlying whole 13 teams in the project. I helped the chief director and the vice chief director in issue management and communication between teams.
Requirements development was ongoing for new client banks, and we had meetings with clients weekly. We updated the requirements definition documents after each meeting and maintained consistency throughout the vast document.",
                        },
                    }
                };

                context.Add(profile0);
                context.SaveChanges();
            }
        }
    }
}
