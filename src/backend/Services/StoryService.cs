using backend.Models;

namespace backend.Services;

public interface IStoryService
{
    Task<StoryResponse> GenerateStoryAsync(StoryRequest request);
    Task<StoryResponse> ContinueStoryAsync(ContinueStoryRequest request);
    Task<StoryResponse> GenerateCustomStoryAsync(CustomStoryRequest request);
}

public class StoryService : IStoryService
{
    private readonly IOllamaService _ollamaService;
    private readonly ITtsService _ttsService;
    private readonly ILogger<StoryService> _logger;

    public StoryService(
        IOllamaService ollamaService,
        ITtsService ttsService,
        ILogger<StoryService> logger)
    {
        _ollamaService = ollamaService;
        _ttsService = ttsService;
        _logger = logger;
    }

    public async Task<StoryResponse> GenerateStoryAsync(StoryRequest request)
    {
        _logger.LogInformation("Generating story for child age {Age} with theme {Theme}", 
            request.ParentalSettings.ChildAge, request.Theme);

        // Generate the story
        var storyText = await _ollamaService.GenerateStoryAsync(request);

        return await ProcessStoryAsync(storyText, request.ParentalSettings);
    }

    public async Task<StoryResponse> ContinueStoryAsync(ContinueStoryRequest request)
    {
        _logger.LogInformation("Continuing story for child age {Age}", 
            request.ParentalSettings.ChildAge);

        // Continue the story
        var storyText = await _ollamaService.ContinueStoryAsync(request);

        return await ProcessStoryAsync(storyText, request.ParentalSettings);
    }

    public async Task<StoryResponse> GenerateCustomStoryAsync(CustomStoryRequest request)
    {
        _logger.LogInformation("Generating custom story for child age {Age} with character {Character}", 
            request.ParentalSettings.ChildAge, request.MainCharacter);

        // Generate the custom story
        var storyText = await _ollamaService.GenerateCustomStoryAsync(request);

        return await ProcessStoryAsync(storyText, request.ParentalSettings);
    }

    private async Task<StoryResponse> ProcessStoryAsync(string storyText, ParentalSettings settings)
    {
        try
        {
            // Check content safety
            var safetyCheck = await _ollamaService.CheckContentSafetyAsync(storyText, settings);

            if (!safetyCheck.IsSafe)
            {
                _logger.LogWarning("Story content failed safety check: {Issues}", 
                    string.Join(", ", safetyCheck.Issues ?? Array.Empty<string>()));
                
                return new StoryResponse
                {
                    StoryText = "I'm sorry, but I couldn't create a safe story with those parameters. Please try again with different settings.",
                    IsSafe = false,
                    SafetyWarnings = safetyCheck.Issues,
                    AudioUrl = string.Empty,
                    EstimatedDuration = TimeSpan.Zero
                };
            }

            // Get optimal TTS parameters
            var ttsParameters = await _ollamaService.GetOptimalTtsParametersAsync(storyText, settings);

            // Generate audio
            var audioUrl = await _ttsService.GenerateAudioAsync(storyText, ttsParameters);

            // Estimate duration (rough calculation: ~150 words per minute average reading speed)
            var wordCount = storyText.Split(' ', StringSplitOptions.RemoveEmptyEntries).Length;
            var estimatedMinutes = Math.Max(1, wordCount / 150.0);
            var estimatedDuration = TimeSpan.FromMinutes(estimatedMinutes);

            return new StoryResponse
            {
                StoryText = storyText,
                AudioUrl = audioUrl,
                IsSafe = true,
                SafetyWarnings = null,
                EstimatedDuration = estimatedDuration,
                TtsParameters = ttsParameters
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing story");
            
            return new StoryResponse
            {
                StoryText = "I apologize, but there was an error creating your story. Please try again.",
                IsSafe = false,
                SafetyWarnings = new[] { "Technical error occurred" },
                AudioUrl = string.Empty,
                EstimatedDuration = TimeSpan.Zero
            };
        }
    }
}