using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace MathSe.Controllers
{
    [ApiController]
    [Route("/math-se-feedback/create-bug")]
    public class CreateBugController : ControllerBase
    {
        private readonly ILogger<CreateBugController> _logger;
        private readonly ICreateBug _createBug;

        public CreateBugController(ILogger<CreateBugController> logger, ICreateBug createBug)
        {
            _logger = logger;
            _createBug = createBug;
        }

        [HttpPost]
        public async Task<IActionResult> PostBug(string title, string description)
        {
            var workItem = await _createBug.CreateBugUsingClientLibAsync(title, description);
            _logger.LogInformation($"Created bug with title '{title}' at {workItem.Url}");
            return Ok();
        }
    }
}
