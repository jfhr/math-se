using MathSe.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading.Tasks;

namespace MathSe.Test
{
    [TestClass]
    //[Ignore]
    public class CreateBugTestRun
    {
        [TestMethod]
        public async Task CreateRealBugAsync()
        {
            var serviceProvider = new ServiceCollection()
               .AddLogging()
               .BuildServiceProvider();
            var factory = serviceProvider.GetService<ILoggerFactory>();
            var logger = factory.CreateLogger<CreateBugController>();
            var target = new CreateBugController(logger, new CreateBug());

            var result = await target.PostBug("My bug title", "My bug description");

            Assert.IsInstanceOfType(result, typeof(OkResult));
        }
    }
}
