using System;
using System.Threading.Tasks;
using HtmlAgilityPack;

namespace YCodeLab.Services.HtmlAgilityPack
{
    public interface IHAPDocumentFactory
    {
        Task<IHAPHtmlDocument> LoadAsync(Uri url);
    }

    public class HAPDocumentFactory : IHAPDocumentFactory
    {
        public async Task<IHAPHtmlDocument> LoadAsync(Uri url)
        {
            var web = new HtmlWeb();
            return new HAPHtmlDocumentWrapper(await web.LoadFromWebAsync(url.ToString()));
        }
    }
}
