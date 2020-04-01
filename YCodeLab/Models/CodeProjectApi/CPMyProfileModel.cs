using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace YCodeLab.Models.CodeProjectApi
{
    public interface ICPMyProfileModel
    {
        public string Id { get; }
        public string UserName { get; }
        public string DisplayName { get; }
    }
}
