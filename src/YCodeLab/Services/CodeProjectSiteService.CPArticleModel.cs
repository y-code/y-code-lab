using System;
using YCodeLab.Models.CodeProjectApi;

namespace YCodeLab.Services
{
    public partial class CodeProjectSiteService
    {
        protected class CPArticleModel : ICPArticleModel
        {
            private ICPArticleModel _original;

            public string Id => _original.Id;
            public string Title => _original.Title;
            public string Summary => _original.Summary;
            public string Rating => _original.Rating;
            public string Votes => _original.Votes;
            public string Link => _original.Link;
            //private string _views;
            public string Views { get; set; }
            //{
            //    get => _views;
            //    set => _views = ConvertNumberLiteral(value);
            //}
            //private string _downloads;
            public string Downloads { get; set; }
            //{
            //    get => _downloads;
            //    set => _downloads = ConvertNumberLiteral(value);
            //}
            //private string _bookmarked;
            public string Bookmarked { get; set; }
            //{
            //    get => _bookmarked;
            //    set => _bookmarked = ConvertNumberLiteral(value);
            //}
            public string CreatedDate => _original.CreatedDate;
            public string ModifiedDate => _original.ModifiedDate;

            public CPArticleModel(ICPArticleModel original)
            {
                _original = original;
            }

            private string ConvertNumberLiteral(string original)
            {
                if (original.EndsWith("K"))
                {
                    var number = decimal.Parse(
                        original.Substring(0, original.Length - 1)
                            .Replace(",", ""));
                    return ((int)(number * 1000)).ToString();
                }
                return original;
            }
        }
    }
}
