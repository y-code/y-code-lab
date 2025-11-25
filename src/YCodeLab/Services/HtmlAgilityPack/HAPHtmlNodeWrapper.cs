using System;
using System.Collections.Generic;
using System.Linq;
using HtmlAgilityPack;

namespace YCodeLab.Services.HtmlAgilityPack
{
    public interface IHAPHtmlNode
    {
        string InnerText { get; }
        IHAPHtmlNode SelectSingleNode(string xpath);
        IHAPHtmlNodeCollection SelectNodes(string xpath);
    }

    public class HAPHtmlNodeWrapper : IHAPHtmlNode
    {
        private HtmlNode _node;

        public string InnerText => _node?.InnerHtml;

        public HAPHtmlNodeWrapper(HtmlNode node)
            => _node = node;

        public IHAPHtmlNode SelectSingleNode(string xpath)
        {
            var n = _node.SelectSingleNode(xpath);
            return n == null ? null : new HAPHtmlNodeWrapper(n);
        }

        public IHAPHtmlNodeCollection SelectNodes(string xpath)
        {
            var n = _node.SelectNodes(xpath);
            return n == null ? null : new HAPHtmlNodeCollectionWrapper(n);
        }
    }
}
