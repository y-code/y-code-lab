using System.Collections.Generic;
using Newtonsoft.Json;
using YCodeLab.Models.CodeProjectApi;

namespace YCodeLab.Services
{
	public partial class CodeProjectApiService
	{
        public class CPBlogPostCollectionModel : List<ICPBlogPostModel>, ICPBlogPostCollectionModel, ICPModel
        {
            private dynamic _data;

            public void SetUpByJson(string json)
            {
                _data = JsonConvert.DeserializeObject(json);
                dynamic items;
                if ((items = _data?.items) != null)
                {
                    foreach (var item in items)
                    {
                        Add(new CPBlogPostModel(item));
                    }
                }
            }

            public bool Validate()
                => _data?.items != null;
        }

        public class CPBlogPostModel : ICPBlogPostModel
        {
            private dynamic _data;

            public string Id => _data?.id;
            public string Title => _data?.title;
            public string Summary => _data?.summary;
            public string Rating => _data?.rating;
            public string Votes => _data?.votes;
            public string Link => $"https:{_data?.websiteLink}";
            public string Views { get; }
            public string Downloads { get; }
            public string Bookmarked { get; }
            public string CreatedDate => _data?.createDate;
            public string ModifiedDate => _data?.modifiedDate;

            public CPBlogPostModel(dynamic data)
            {
                _data = data;
            }
        }
    }
}
