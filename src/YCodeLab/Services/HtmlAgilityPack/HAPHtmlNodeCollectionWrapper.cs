using System;
using System.Collections.Generic;
using System.Linq;
using HtmlAgilityPack;

namespace YCodeLab.Services.HtmlAgilityPack
{
    public interface IHAPHtmlNodeCollection : IList<IHAPHtmlNode>
    {
    }

    public class HAPHtmlNodeCollectionWrapper : List<IHAPHtmlNode>, IHAPHtmlNodeCollection
    {
        private HtmlNodeCollection _nodes;

        public HAPHtmlNodeCollectionWrapper(HtmlNodeCollection nodes)
        {
            _nodes = nodes;
            AddRange(_nodes.Select(n => new HAPHtmlNodeWrapper(n)));
        }
    }
}
