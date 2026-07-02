using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using YCodeLab.Models.CodeProjectApi;

namespace YCodeLab.Services
{
	public partial class CodeProjectApiService
	{
        protected class CPArticleCollectionModel : List<ICPArticleModel>, ICPArticleCollectionModel, ICPModel
        {
            private dynamic _data;

            public void SetUpByJson(string json)
            {
                _data = JsonConvert.DeserializeObject(json);
                dynamic items;
                if ((items = _data?.items) != null)
                    foreach (var item in items)
                        Add(new CPArticleModel(item));
            }

            public bool Validate()
                => _data?.items != null;
        }

        protected class CPArticleModel : ICPArticleModel
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
            public string CreatedDate => _data?.createdDate;
            public string ModifiedDate => _data?.modifiedDate;

            public CPArticleModel(dynamic data)
            {
                _data = data;
            }
        }
	}
}
