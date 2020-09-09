using Microsoft.TeamFoundation.WorkItemTracking.WebApi;
using Microsoft.TeamFoundation.WorkItemTracking.WebApi.Models;
using Microsoft.VisualStudio.Services.Common;
using Microsoft.VisualStudio.Services.WebApi.Patch.Json;
using Microsoft.VisualStudio.Services.WebApi.Patch;
using Microsoft.VisualStudio.Services.WebApi;
using System;
using System.Threading.Tasks;

namespace MathSe
{
    public class CreateBug : ICreateBug
    {
        readonly string _uri;
        readonly string _personalAccessToken;
        readonly string _project;

        /// <summary>
        /// Constructor. Manually set values to match your organization. 
        /// </summary>
        public CreateBug()
        {
            _uri = "https://dev.azure.com/ogoo";
            _personalAccessToken = "qc54de6fn2hjdxyybxxkrw4xo5ehliufbrgpbdhvtiokeff5g3sa";
            _project = "math-training";
        }

        /// <summary>
        /// Create a bug using the .NET client library
        /// </summary>
        public async Task<WorkItem> CreateBugUsingClientLibAsync(string title, string description, string severity = "2 - High", int priority = 1)
        {
            var uri = new Uri(_uri);

            var credentials = new VssBasicCredential("", _personalAccessToken);
            var patchDocument = new JsonPatchDocument
            {
                //add fields and their values to your patch document
                new JsonPatchOperation()
                {
                    Operation = Operation.Add,
                    Path = "/fields/System.Title",
                    Value = title,
                },
                new JsonPatchOperation()
                {
                    Operation = Operation.Add,
                    Path = "/fields/System.Description",
                    Value = description,
                },
                new JsonPatchOperation()
                {
                    Operation = Operation.Add,
                    Path = "/fields/Microsoft.VSTS.Common.Priority",
                    Value = priority.ToString(),
                },
                new JsonPatchOperation()
                {
                    Operation = Operation.Add,
                    Path = "/fields/Microsoft.VSTS.Common.Severity",
                    Value = severity,
                }
            };

            using var connection = new VssConnection(uri, credentials);
            var workItemTrackingHttpClient = connection.GetClient<WorkItemTrackingHttpClient>();

            var workItem = await workItemTrackingHttpClient.CreateWorkItemAsync(patchDocument, _project, "Issue");
            return workItem;
        }
    }
}
