using System;
using System.Net;

namespace YCodeLab.Services.Net
{
    public interface IHttpWebRequestFactory
    {
        IHttpWebRequest Create(Uri uri);
    }

    internal class HttpWebRequestFactory : IHttpWebRequestFactory
    {
        public HttpWebRequestFactory()
        {
        }

        public IHttpWebRequest Create(Uri uri)
        {
            return new HttpWebRequestWrapper((HttpWebRequest)HttpWebRequest.Create(uri));
        }
    }
}
