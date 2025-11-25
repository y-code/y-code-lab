using Newtonsoft.Json;
using YCodeLab.Models.CodeProjectApi;

namespace YCodeLab.Services
{
	public partial class CodeProjectApiService
	{
        public class CPMyProfileModel : ICPMyProfileModel, ICPModel
        {
            private dynamic _data;

            public string Id => _data?.id;
            public string UserName => _data?.userName;
            public string DisplayName => _data?.displayName;

            public void SetUpByJson(string json)
            {
                _data = JsonConvert.DeserializeObject(json);
            }

            public bool Validate()
                => DisplayName != null;
        }
    }
}
