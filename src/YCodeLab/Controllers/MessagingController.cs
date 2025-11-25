using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using YCodeLab.DB;
using YCodeLab.DB.Messaging;
using YCodeLab.Models;

namespace YCodeLab.Controllers;

[Route("api/[Controller]")]
[ApiController]
public class MessagingController : ControllerBase
{
    private readonly ILogger<MessagingController> _logger;
    private readonly YCodeLabDbContext _dbContext;

    public MessagingController(YCodeLabDbContext dbContext, ILogger<MessagingController> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    public class PostMessagesResponse : ApiResponse
    {
        public long? MessageId { get; set; }
    }

    [HttpPost("[action]")]
    public async Task<ApiResponse> Messages([FromBody] Message message, bool submit = false)
    {
        const string failureMessage = "Hi, I'm Yas, the owner of this website. "
                + "I'm sorry but there was an issue and the system failed to send your message. "
                + "I will solve this issue as soon as possible.";

        if (!submit)
            return new PostMessagesResponse { Status = ApiResponseStatus.Success };

        try
        {
            _dbContext.Set<Message>().Add(message);
            _dbContext.SaveChanges();
        }
        catch (Exception e)
        {
            _logger.LogCritical("Failed to store message. Entity Framework throwed an exception. {@Message}. {@Exception}", message, e);
            return new FailureApiResponse(failureMessage);
        }

        if (!message.Id.HasValue)
            _logger.LogCritical("Failed to store message. "
                + "Entity Framework successfully completed saving changes, but didn't get new message ID. "
                + "Message info: {@Message}.", message);

        return new ApiResponse<object>(
            message.Id.HasValue ? new { messageId = message.Id } : null,
            "Hi, I'm Yas. Thank you for sending a message. I will be in touch with you soon.",
            failureMessage);
    }

    [HttpGet("[action]/{id?}")]
    public async Task<ApiResponse> Messages(long? id, string token)
    {
        var adminToken = Environment.GetEnvironmentVariable("ADMIN_TOKEN");

        if (token != adminToken)
        {
            _logger.LogWarning("API /api/Messaging/Message is called with invalid token, {Token}.", token);
            return new PermissionDeniedApiResponse();
        }

        if (!id.HasValue)
        {
            var result = _dbContext.Set<Message>().Select(e => e);
            return new ApiResponse<IEnumerable<Message>>(
                result.Any() ? result : null,
                "Messages were found.",
                "No message was found.");
        }
        else
        {
            var result = _dbContext.Set<Message>().Where(m => m.Id == id);
            return new ApiResponse<IEnumerable<Message>>(
                result.Any() ? result : null,
                "The message was found.",
                "No message was found with the provided message ID.");
        }
    }
}
