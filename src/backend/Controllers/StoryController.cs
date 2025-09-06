using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StoryController : ControllerBase
{
    private readonly IStoryService _storyService;
    private readonly ILogger<StoryController> _logger;

    public StoryController(IStoryService storyService, ILogger<StoryController> logger)
    {
        _storyService = storyService;
        _logger = logger;
    }

    /// <summary>
    /// Generate a new story based on basic parameters
    /// </summary>
    [HttpPost("generate")]
    public async Task<ActionResult<StoryResponse>> GenerateStory([FromBody] StoryRequest request)
    {
        try
        {
            _logger.LogInformation("Received story generation request for child age {Age}", 
                request.ParentalSettings.ChildAge);

            var response = await _storyService.GenerateStoryAsync(request);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating story");
            return StatusCode(500, new { message = "An error occurred while generating the story" });
        }
    }

    /// <summary>
    /// Continue an existing story
    /// </summary>
    [HttpPost("continue")]
    public async Task<ActionResult<StoryResponse>> ContinueStory([FromBody] ContinueStoryRequest request)
    {
        try
        {
            _logger.LogInformation("Received story continuation request for child age {Age}", 
                request.ParentalSettings.ChildAge);

            var response = await _storyService.ContinueStoryAsync(request);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error continuing story");
            return StatusCode(500, new { message = "An error occurred while continuing the story" });
        }
    }

    /// <summary>
    /// Generate a custom story with detailed parameters
    /// </summary>
    [HttpPost("custom")]
    public async Task<ActionResult<StoryResponse>> GenerateCustomStory([FromBody] CustomStoryRequest request)
    {
        try
        {
            _logger.LogInformation("Received custom story request for child age {Age} with character {Character}", 
                request.ParentalSettings.ChildAge, request.MainCharacter);

            var response = await _storyService.GenerateCustomStoryAsync(request);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating custom story");
            return StatusCode(500, new { message = "An error occurred while generating the custom story" });
        }
    }

    /// <summary>
    /// Health check endpoint
    /// </summary>
    [HttpGet("health")]
    public IActionResult Health()
    {
        return Ok(new { status = "healthy", timestamp = DateTime.UtcNow });
    }
}