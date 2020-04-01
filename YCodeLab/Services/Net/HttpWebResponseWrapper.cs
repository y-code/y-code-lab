using System;
using System.IO;
using System.Net;

namespace YCodeLab.Services.Net
{
    public interface IHttpWebResponse : IDisposable
    {
        HttpWebResponse Response { get; }
        Uri ResponseUri { get; }
        HttpStatusCode StatusCode { get; }
        string ContentType { get; }
        string ContentEncoding { get; }
        WebHeaderCollection Headers { get; }
        DateTime LastModified { get; }

        Stream GetResponseStream();
        void Close();
    }

    internal class HttpWebResponseWrapper : IHttpWebResponse
    {
        HttpWebResponse _response;
        public HttpWebResponse Response { get { return _response; } }

        public HttpWebResponseWrapper(HttpWebResponse response)
        {
            _response = response;
        }

        public Uri ResponseUri { get { return _response.ResponseUri; } }
        public HttpStatusCode StatusCode { get { return _response.StatusCode; } }
        public string ContentType { get { return _response.ContentType; } }
        public string ContentEncoding { get { return _response.ContentEncoding; } }
        public WebHeaderCollection Headers { get { return _response.Headers; } }
        public DateTime LastModified { get { return _response.LastModified; } }

        public void Close()
        {
            _response.Close();
        }

        public void Dispose()
        {
			_response.Dispose();
        }

        public Stream GetResponseStream()
        {
            return _response.GetResponseStream();
        }
    }
}
