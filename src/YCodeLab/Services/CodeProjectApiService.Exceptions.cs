using System;
using System.IO;
using System.Net;
using YCodeLab.Services.Net;

namespace YCodeLab.Services
{
    public partial class CodeProjectApiService
    {
        public class CodeProjectApiException : YCodeLabException
        {
            public Uri Url { get; private set; }
            public HttpStatusCode ResponseStatus { get; private set; }
            public string ResponseMessage { get; private set; }

            public CodeProjectApiException(Uri url, HttpStatusCode responseStatus, string responseMessage)
                : base(Format(null, url, responseStatus, responseMessage))
                => Construct(url, responseStatus, responseMessage);
            public CodeProjectApiException(Uri url, HttpStatusCode responseStatus, string responseMessage, string message)
                : base(Format(message, url, responseStatus, responseMessage))
                => Construct(url, responseStatus, responseMessage);
            public CodeProjectApiException(Uri url, HttpStatusCode responseStatus, string responseMessage, Exception e)
                : base(e, Format(e.Message, url, responseStatus, responseMessage))
                => Construct(url, responseStatus, responseMessage);
            public CodeProjectApiException(Uri url, HttpStatusCode responseStatus, string responseMessage, Exception e, string message)
                : base(e, Format(message, url, responseStatus, responseMessage))
                => Construct(url, responseStatus, responseMessage);

            private static string Format(string message, Uri url, HttpStatusCode responseStatus, string responseMessage)
            {
                return (message == null ? "" : $"{message} ") + $"(URL: {url}, Status: {responseStatus}, Response: {responseMessage})";
            }

            private void Construct(Uri url, HttpStatusCode responseStatus, string responseMessage)
            {
                Url = url;
                ResponseStatus = responseStatus;
                ResponseMessage = responseMessage;
            }
        }

        public class InvalidCredentialException : CodeProjectApiException
        {
            public InvalidCredentialException(Uri url, HttpStatusCode responseStatus, string responseMessage, WebExceptionWrapper e)
                : base(url, responseStatus, responseMessage, e, "Authentication failed. Credential needs to be confirmed.")
            {
            }
        }

        public class ApiMethodResponseInUnexpectedFormatException : CodeProjectApiException
        {
            public ApiMethodResponseInUnexpectedFormatException(Uri url, HttpStatusCode responseStatus, string responseMessage)
                : base(url, responseStatus, responseMessage, $"The response from Code Project Token API was not in the expected format.")
            {
            }
        }

        public class ApiMethodNotFoundException : CodeProjectApiException
        {
            public ApiMethodNotFoundException(Uri url, HttpStatusCode responseStatus, string responseMessage, WebExceptionWrapper e)
                : base(url, responseStatus, responseMessage, e, $"Token API method was not found at Code Project API endpoint.")
            {
            }
        }
    }
}
