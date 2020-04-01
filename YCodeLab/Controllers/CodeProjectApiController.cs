using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using YCodeLab.Models.CodeProjectApi;
using YCodeLab.Services;

namespace YCodeLab.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class CodeProjectApiController : ControllerBase
    {
        private readonly ILogger<CodeProjectApiController> _logger;
        private ICodeProjectApiService _cpApiService;

        public CodeProjectApiController(
            ILogger<CodeProjectApiController> logger,
            ICodeProjectApiService cpApiService)
        {
            _logger = logger;
            _cpApiService = cpApiService;
        }

        [HttpGet("[action]")]
        public async Task<ICPArticleCollectionModel> GetMyArticles()
        {
            return _cpApiService.Cache?.MyArticles;
        }

        [HttpGet("[action]")]
        public async Task<ICPBlogPostCollectionModel> GetMyBlogPosts()
        {
            return _cpApiService.Cache?.MyBlogPosts;
        }

        [HttpGet("[action]")]
        public async Task<ICPTipCollectionModel> GetMyTips()
        {
            return _cpApiService.Cache?.MyTips;
        }
    }
}