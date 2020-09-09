using Microsoft.TeamFoundation.WorkItemTracking.WebApi.Models;
using System.Threading.Tasks;

namespace MathSe
{
    /// <summary>
    /// Creates bugs in Azure Devops
    /// </summary>
    public interface ICreateBug
    {
        /// <summary>
        /// Create a bug using the .NET client library
        /// </summary>
        Task<WorkItem> CreateBugUsingClientLibAsync(string title, string reproSteps, string severity = "2 - High", int priority = 1);
    }
}
