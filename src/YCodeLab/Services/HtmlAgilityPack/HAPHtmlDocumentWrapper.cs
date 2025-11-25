using System;
using HtmlAgilityPack;

namespace YCodeLab.Services.HtmlAgilityPack
{
    public interface IHAPHtmlDocument
    {
        IHAPHtmlNode DocumentNode { get; }
    }

    public class HAPHtmlDocumentWrapper : IHAPHtmlDocument
    {
        private HtmlDocument _doc;

        private Lazy<IHAPHtmlNode> _documentNode;
        public IHAPHtmlNode DocumentNode => _documentNode.Value;

        public HAPHtmlDocumentWrapper(HtmlDocument doc)
        {
            _doc = doc;
            _documentNode = new Lazy<IHAPHtmlNode>(() => new HAPHtmlNodeWrapper(_doc.DocumentNode));
        }
    }
}
