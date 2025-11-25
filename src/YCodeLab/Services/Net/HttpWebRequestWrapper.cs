using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;

namespace YCodeLab.Services.Net
{
    public interface IHttpWebRequest
    {
        HttpWebRequest Request { get; }
        string Method { get; set; }
        string UserAgent { get; set; }
        bool AllowAutoRedirect { get; set; }
        ICredentials Credentials { get; set; }
        IWebProxy Proxy { get; set; }
        Uri RequestUri { get; }
        DateTime IfModifiedSince { get; set; }
        CookieContainer CookieContainer { get; set; }
        string ContentType { get; set; }
        long ContentLength { get; set; }
        WebHeaderCollection Headers { get; set; }

        Stream GetRequestStream();
        IHttpWebResponse GetResponse();
        Task<IHttpWebResponse> GetResponseAsync();
    }

    internal class HttpWebRequestWrapper : IHttpWebRequest
    {
        HttpWebRequest _request;
        public HttpWebRequest Request { get { return _request; } }

        public HttpWebRequestWrapper(HttpWebRequest request)
        {
            _request = request;
        }

        public string Method { get { return _request.Method; } set { _request.Method = value; } }
        public string UserAgent { get { return _request.UserAgent; } set { _request.UserAgent = value; } }
        public bool AllowAutoRedirect { get { return _request.AllowAutoRedirect; } set { _request.AllowAutoRedirect = value; } }
        public ICredentials Credentials { get { return _request.Credentials; } set { _request.Credentials = value; } }
        public IWebProxy Proxy { get { return _request.Proxy; } set { _request.Proxy = value; } }
        public Uri RequestUri { get { return _request.RequestUri; } }
        public DateTime IfModifiedSince { get { return _request.IfModifiedSince; } set { _request.IfModifiedSince = value; } }
        public CookieContainer CookieContainer { get { return _request.CookieContainer; } set { _request.CookieContainer = value; } }
        public string ContentType { get => _request.ContentType; set => _request.ContentType = value; }
        public long ContentLength { get => _request.ContentLength; set => _request.ContentLength = value; }
        public WebHeaderCollection Headers { get => _request.Headers; set => _request.Headers = value; }

        public Stream GetRequestStream()
        {
            return _request.GetRequestStream();
        }

        public IHttpWebResponse GetResponse()
        {
            try
            {
                return new HttpWebResponseWrapper((HttpWebResponse)_request.GetResponse());
            }
            catch (WebException e)
            {
                throw new WebExceptionWrapper(e);
            }
        }

        public async Task<IHttpWebResponse> GetResponseAsync()
        {
            try
            {
                return new HttpWebResponseWrapper((HttpWebResponse)await _request.GetResponseAsync());
            }
            catch (WebException e)
            {
                throw new WebExceptionWrapper(e);
            }
        }
    }

}
