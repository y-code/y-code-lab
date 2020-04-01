using System;
namespace YCodeLab
{
    public class YCodeLabException : Exception
    {
        public YCodeLabException() { }
        public YCodeLabException(string message) : base(message) { }
        public YCodeLabException(Exception e) : base(e.Message, e) { }
        public YCodeLabException(Exception e, string message) : base(message, e) { }
    }
}
