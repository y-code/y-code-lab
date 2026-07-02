using System;
namespace YCodeLab.Services
{
	public partial class CodeProjectApiService
	{
		protected interface ICPModel
		{
			void SetUpByJson(string json);
			bool Validate();
		}
	}
}
