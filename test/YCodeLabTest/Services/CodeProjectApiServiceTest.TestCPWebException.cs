using System;
using System.Net;
using YCodeLab.Services.Net;

namespace YCodeLab.Test.Services
{
	public partial class CodeProjectApiServiceTest
	{
        internal class TestCPWebException : WebExceptionWrapper
        {
            public override HttpStatusCode ResponseStatusCode { get; }
            public override string ResponseMessage { get; }

            public TestCPWebException(HttpStatusCode responseStatusCode, string responseMessage)
                : base(null)
            {
                ResponseStatusCode = responseStatusCode;
                ResponseMessage = responseMessage;
            }
        }
	}
}
