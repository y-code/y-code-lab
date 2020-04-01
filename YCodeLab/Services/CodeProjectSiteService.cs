using System;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using HtmlAgilityPack;
using Microsoft.Extensions.Logging;
using YCodeLab.Models.CodeProjectApi;
using YCodeLab.Services.HtmlAgilityPack;

namespace YCodeLab.Services
{
    public partial class CodeProjectSiteService
    {
        private ILogger<CodeProjectSiteService> _logger;
        private IHAPDocumentFactory _hapDocumentFactory;

        private readonly Regex _regexViews = new Regex(@"\s*views$");
        private readonly Regex _regexDownloads = new Regex(@"\s*downloads$");
        private readonly Regex _regexBookmarked = new Regex(@"\s*bookmarked$");

        public CodeProjectSiteService(ILogger<CodeProjectSiteService> logger, IHAPDocumentFactory hapDocumentFactory)
        {
            _logger = logger;
            _hapDocumentFactory = hapDocumentFactory;
        }

        public async Task<ICPArticleModel> AppendInfo(ICPArticleModel original)
        {
            var doc = await _hapDocumentFactory.LoadAsync(new Uri(original.Link));
            var data = new CPArticleModel(original);
            var node1 = doc.DocumentNode.SelectSingleNode("//div[@class='stats']/div[contains(text(), 'views')]");
            if (node1 != null)
                data.Views = _regexViews.Replace(node1.InnerText, "");
            var node2 = doc.DocumentNode.SelectSingleNode("//div[@class='stats']/div[contains(text(), 'downloads')]");
            if (node2 != null)
                data.Downloads = _regexDownloads.Replace(node2.InnerText, "");
            var node3 = doc.DocumentNode.SelectSingleNode("//div[@class='stats']/div[contains(text(), 'bookmarked')]");
            if (node3 != null)
                data.Bookmarked = _regexBookmarked.Replace(node3.InnerText, "");
            return data;
        }

        public async Task<ICPBlogPostModel> AppendInfo(ICPBlogPostModel original)
        {
            var doc = await _hapDocumentFactory.LoadAsync(new Uri(original.Link));
            var data = new CPBlogPostModel(original);
            var node1 = doc.DocumentNode.SelectSingleNode("//div[@class='stats']/div[contains(text(), 'views')]");
            if (node1 != null)
                data.Views = _regexViews.Replace(node1.InnerText, "");
            var node2 = doc.DocumentNode.SelectSingleNode("//div[@class='stats']/div[contains(text(), 'downloads')]");
            if (node2 != null)
                data.Downloads = _regexDownloads.Replace(node2.InnerText, "");
            var node3 = doc.DocumentNode.SelectSingleNode("//div[@class='stats']/div[contains(text(), 'bookmarked')]");
            if (node3 != null)
                data.Bookmarked = _regexBookmarked.Replace(node3.InnerText, "");
            return data;
        }

        public async Task<ICPTipModel> AppendInfo(ICPTipModel original)
        {
            var doc = await _hapDocumentFactory.LoadAsync(new Uri(original.Link));
            var data = new CPTipModel(original);
            var node1 = doc.DocumentNode.SelectSingleNode("//div[@class='stats']/div[contains(text(), 'views')]");
            if (node1 != null)
                data.Views = _regexViews.Replace(node1.InnerText, "");
            var node2 = doc.DocumentNode.SelectSingleNode("//div[@class='stats']/div[contains(text(), 'downloads')]");
            if (node2 != null)
                data.Downloads = _regexDownloads.Replace(node2.InnerText, "");
            var node3 = doc.DocumentNode.SelectSingleNode("//div[@class='stats']/div[contains(text(), 'bookmarked')]");
            if (node3 != null)
                data.Bookmarked = _regexBookmarked.Replace(node3.InnerText, "");
            return data;
        }
    }
}
