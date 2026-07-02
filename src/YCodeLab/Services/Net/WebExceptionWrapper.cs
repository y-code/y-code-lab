using System;
using System.IO;
using System.Net;

namespace YCodeLab.Services.Net
{
    public class WebExceptionWrapper : Exception
    {
        private WebException _exception => (WebException)InnerException;
        private HttpWebResponse _response => (HttpWebResponse)_exception.Response;

        public virtual HttpStatusCode ResponseStatusCode => _response.StatusCode;
        private Lazy<string> _responseMessage;
        public virtual string ResponseMessage => _responseMessage.Value;

        public WebExceptionWrapper(WebException e) : base(e?.Message, e)
        {
            _responseMessage = new Lazy<string>(() =>
            {
                using (var stream = ((HttpWebResponse)e.Response).GetResponseStream())
                using (var reader = new StreamReader(stream))
                    return reader.ReadToEnd();
            });
        }
    }
}
