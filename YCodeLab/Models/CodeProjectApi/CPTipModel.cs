using System;
using System.Collections.Generic;

namespace YCodeLab.Models.CodeProjectApi
{
    public interface ICPTipCollectionModel : IList<ICPTipModel>
    {
    }

    public interface ICPTipModel
    {
        public string Id { get; }
        public string Title { get; }
        public string Summary { get; }
        public string Rating { get; }
        public string Votes { get; }
        public string Link { get; }
        public string Views { get; }
        public string Downloads { get; }
        public string Bookmarked { get; }
        public string CreatedDate { get; }
        public string ModifiedDate { get; }
    }
}
