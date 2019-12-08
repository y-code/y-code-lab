using System.Text.Json.Serialization;

namespace YCodeLab.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ApiResponseStatus
    {
        Success,
        Failure
    }

    public abstract class ApiResponse
    {
        public ApiResponseStatus Status { get; set; }
        public string Message { get; set; }
    }

    public class ApiResponse<T> : ApiResponse where T: class
    {
        public T Result { get; set; }
        public ApiResponse(T result, string successMessage, string failureMessage)
        {
            Result = result;
            if (Result == null)
            {
                Status = ApiResponseStatus.Failure;
                Message = failureMessage;
            }
            else
            {
                Status = ApiResponseStatus.Success;
                Message = successMessage;
            }
        }
    }

    public class FailureApiResponse : ApiResponse<object>
    {
        public FailureApiResponse(string message)
            : base(null, null, message) { }
    }

    public class PermissionDeniedApiResponse : ApiResponse
    {
        public PermissionDeniedApiResponse()
        {
            Status = ApiResponseStatus.Failure;
            Message = "Permission denied";
        }
    }
}
