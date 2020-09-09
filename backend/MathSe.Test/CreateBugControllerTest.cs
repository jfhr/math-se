using MathSe.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.TeamFoundation.WorkItemTracking.WebApi.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Threading.Tasks;

namespace MathSe.Test
{
    [TestClass]
    public class CreateBugControllerTest
    {
        CreateBugController _target;
        Mock<ICreateBug> _createBugMock;

        [TestInitialize]
        public void Initialize()
        {
            var serviceProvider = new ServiceCollection()
               .AddLogging()
               .BuildServiceProvider();
            var factory = serviceProvider.GetService<ILoggerFactory>();
            var logger = factory.CreateLogger<CreateBugController>();
            
            _createBugMock = new Mock<ICreateBug>();
            _createBugMock
                .Setup(x => x.CreateBugUsingClientLibAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<int>()))
                .ReturnsAsync(new WorkItem() { Url = "https://example.com/bug" })
                .Verifiable();

            _target = new CreateBugController(logger, _createBugMock.Object);
        }

        [TestMethod]
        public async Task TestCreateBugAsync()
        {
            const string title = "My bug title";
            const string description = "My bug repro steps";

            var result = await _target.PostBug(title, description);

            Assert.IsInstanceOfType(result, typeof(OkResult));
            _createBugMock
                .Verify(x => x.CreateBugUsingClientLibAsync(title, description, "2 - High", 1));
        }
    }
}
