using System;
using YCodeLab.Models.CodeProjectApi;

namespace YCodeLab.Services
{
    public partial class CodeProjectSiteService
    {
        protected class CPTipModel : ICPTipModel
        {
            private ICPTipModel _original;

            public string Id => _original.Id;
            public string Title => _original.Title;
            public string Summary => _original.Summary;
            public string Rating => _original.Rating;
            public string Votes => _original.Votes;
            public string Link => _original.Link;
            public string Views { get; set; }
            public string Downloads { get; set; }
            public string Bookmarked { get; set; }
            public string CreatedDate => _original.CreatedDate;
            public string ModifiedDate => _original.ModifiedDate;

            public CPTipModel(ICPTipModel original)
            {
                _original = original;
            }
        }
    }
}
