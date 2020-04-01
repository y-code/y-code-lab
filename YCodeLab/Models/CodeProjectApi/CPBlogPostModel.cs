using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace YCodeLab.Models.CodeProjectApi
{
    public interface ICPBlogPostCollectionModel : IList<ICPBlogPostModel>
    {
    }

    public interface ICPBlogPostModel
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
