using System.Text.Json;
using backend.Models;

namespace backend.Services;

public interface IOllamaService
{
    Task<string> GenerateStoryAsync(StoryRequest request);
    Task<string> ContinueStoryAsync(ContinueStoryRequest request);
    Task<string> GenerateCustomStoryAsync(CustomStoryRequest request);
    Task<SafetyCheckResponse> CheckContentSafetyAsync(string content, ParentalSettings settings);
    Task<TtsParameters> GetOptimalTtsParametersAsync(string storyText, ParentalSettings settings);
}

public class OllamaService : IOllamaService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<OllamaService> _logger;
    private readonly string _baseUrl;

    public OllamaService(HttpClient httpClient, ILogger<OllamaService> logger, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _logger = logger;
        _baseUrl = configuration.GetValue<string>("OllamaUrl") ?? "http://ollama:11434";
    }

    public async Task<string> GenerateStoryAsync(StoryRequest request)
    {
        var prompt = BuildStoryPrompt(request);
        return await CallOllamaAsync(prompt);
    }

    public async Task<string> ContinueStoryAsync(ContinueStoryRequest request)
    {
        var prompt = BuildContinuePrompt(request);
        return await CallOllamaAsync(prompt);
    }

    public async Task<string> GenerateCustomStoryAsync(CustomStoryRequest request)
    {
        var prompt = BuildCustomStoryPrompt(request);
        return await CallOllamaAsync(prompt);
    }

    public async Task<SafetyCheckResponse> CheckContentSafetyAsync(string content, ParentalSettings settings)
    {
        var prompt = BuildSafetyCheckPrompt(content, settings);
        var response = await CallOllamaAsync(prompt);
        
        return ParseSafetyResponse(response);
    }

    public async Task<TtsParameters> GetOptimalTtsParametersAsync(string storyText, ParentalSettings settings)
    {
        var prompt = BuildTtsParametersPrompt(storyText, settings);
        var response = await CallOllamaAsync(prompt);
        
        return ParseTtsParametersResponse(response, settings);
    }

    private async Task<string> CallOllamaAsync(string prompt)
    {
        try
        {
            var request = new
            {
                model = "llama3.2:1b", // Lightweight model for our use case
                prompt = prompt,
                stream = false,
                options = new
                {
                    temperature = 0.7,
                    top_p = 0.9,
                    max_tokens = 1000
                }
            };

            var json = JsonSerializer.Serialize(request);
            var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync($"{_baseUrl}/api/generate", content);
            response.EnsureSuccessStatusCode();

            var responseJson = await response.Content.ReadAsStringAsync();
            var ollamaResponse = JsonSerializer.Deserialize<JsonElement>(responseJson);
            
            return ollamaResponse.GetProperty("response").GetString() ?? string.Empty;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error calling Ollama API");
            throw;
        }
    }

    private string BuildStoryPrompt(StoryRequest request)
    {
        var settings = request.ParentalSettings;
        var prompt = $@"Create a delightful bedtime story for a {settings.ChildAge}-year-old child.

Story Requirements:
- Theme: {request.Theme ?? "magical adventure"}
- Character: {request.CharacterName ?? "a brave little hero"}
- Setting: {request.Setting ?? "an enchanted forest"}
- Language: {settings.LanguagePreference}
- Max duration: approximately {settings.MaxStoryLength} minutes of reading
- Voice type desired: {settings.VoiceType}

Safety Guidelines:
- Age-appropriate for {settings.ChildAge} years old
- Allowed themes: {string.Join(", ", settings.AllowedThemes)}
- Magic allowed: {settings.AllowMagic}
- Adventure allowed: {settings.AllowAdventure}
- Scary elements allowed: {settings.AllowScaryElements}
- Avoid these words/concepts: {string.Join(", ", settings.RestrictedWords)}

Please write a warm, engaging story that promotes positive values like friendship, kindness, and courage. The story should be calming and perfect for bedtime.

Story:";

        return prompt;
    }

    private string BuildContinuePrompt(ContinueStoryRequest request)
    {
        var settings = request.ParentalSettings;
        return $@"Continue this bedtime story for a {settings.ChildAge}-year-old child:

Existing Story:
{request.ExistingStory}

Direction: {request.Direction ?? "Continue naturally"}

Safety Guidelines:
- Age-appropriate for {settings.ChildAge} years old
- Magic allowed: {settings.AllowMagic}
- Adventure allowed: {settings.AllowAdventure}
- Scary elements allowed: {settings.AllowScaryElements}
- Avoid these words/concepts: {string.Join(", ", settings.RestrictedWords)}

Continue the story:";
    }

    private string BuildCustomStoryPrompt(CustomStoryRequest request)
    {
        var settings = request.ParentalSettings;
        return $@"Create a custom bedtime story for a {settings.ChildAge}-year-old child with these specifications:

Main Character: {request.MainCharacter}
Setting: {request.Setting}
Plot: {request.Plot}
Additional Characters: {string.Join(", ", request.AdditionalCharacters ?? Array.Empty<string>())}
Moral Lesson: {request.MoralLesson ?? "the importance of kindness"}

Safety Guidelines:
- Age-appropriate for {settings.ChildAge} years old
- Magic allowed: {settings.AllowMagic}
- Adventure allowed: {settings.AllowAdventure}
- Scary elements allowed: {settings.AllowScaryElements}
- Avoid these words/concepts: {string.Join(", ", settings.RestrictedWords)}

Write the story:";
    }

    private string BuildSafetyCheckPrompt(string content, ParentalSettings settings)
    {
        return $@"Analyze this story content for child safety for a {settings.ChildAge}-year-old:

Content: {content}

Safety Criteria:
- Age-appropriate for {settings.ChildAge} years old
- Magic allowed: {settings.AllowMagic}
- Adventure allowed: {settings.AllowAdventure}
- Scary elements allowed: {settings.AllowScaryElements}
- Restricted words to avoid: {string.Join(", ", settings.RestrictedWords)}

Respond in JSON format:
{{
  ""isSafe"": true/false,
  ""issues"": [""list of any issues found""],
  ""recommendation"": ""suggestion if not safe""
}}";
    }

    private string BuildTtsParametersPrompt(string storyText, ParentalSettings settings)
    {
        return $@"Analyze this story text and recommend optimal TTS parameters for a {settings.ChildAge}-year-old child:

Story: {storyText.Substring(0, Math.Min(storyText.Length, 500))}...

Desired voice type: {settings.VoiceType}
Child age: {settings.ChildAge}

Respond in JSON format with optimal parameters for parler-tts-mini model:
{{
  ""voiceName"": ""speaker name"",
  ""speed"": 0.8-1.2,
  ""description"": ""voice description for TTS""
}}";
    }

    private SafetyCheckResponse ParseSafetyResponse(string response)
    {
        try
        {
            // Try to extract JSON from the response
            var startIndex = response.IndexOf('{');
            var endIndex = response.LastIndexOf('}');
            
            if (startIndex >= 0 && endIndex > startIndex)
            {
                var jsonStr = response.Substring(startIndex, endIndex - startIndex + 1);
                var parsed = JsonSerializer.Deserialize<JsonElement>(jsonStr);
                
                return new SafetyCheckResponse
                {
                    IsSafe = parsed.TryGetProperty("isSafe", out var isSafe) && isSafe.GetBoolean(),
                    Issues = parsed.TryGetProperty("issues", out var issues) ? 
                        issues.EnumerateArray().Select(x => x.GetString() ?? "").ToArray() : null,
                    Recommendation = parsed.TryGetProperty("recommendation", out var rec) ? 
                        rec.GetString() : null
                };
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to parse safety response, defaulting to safe");
        }

        // Default to safe if parsing fails
        return new SafetyCheckResponse { IsSafe = true };
    }

    private TtsParameters ParseTtsParametersResponse(string response, ParentalSettings settings)
    {
        try
        {
            var startIndex = response.IndexOf('{');
            var endIndex = response.LastIndexOf('}');
            
            if (startIndex >= 0 && endIndex > startIndex)
            {
                var jsonStr = response.Substring(startIndex, endIndex - startIndex + 1);
                var parsed = JsonSerializer.Deserialize<JsonElement>(jsonStr);
                
                return new TtsParameters
                {
                    VoiceName = parsed.TryGetProperty("voiceName", out var voice) ? 
                        voice.GetString() ?? "en_speaker_6" : "en_speaker_6",
                    Speed = parsed.TryGetProperty("speed", out var speed) ? 
                        speed.GetSingle() : 1.0f,
                    Description = parsed.TryGetProperty("description", out var desc) ? 
                        desc.GetString() ?? GetDefaultVoiceDescription(settings.VoiceType) : 
                        GetDefaultVoiceDescription(settings.VoiceType)
                };
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to parse TTS parameters, using defaults");
        }

        return new TtsParameters
        {
            VoiceName = "en_speaker_6",
            Speed = 1.0f,
            Description = GetDefaultVoiceDescription(settings.VoiceType)
        };
    }

    private string GetDefaultVoiceDescription(string voiceType)
    {
        return voiceType.ToLower() switch
        {
            "warm" => "A warm, nurturing voice perfect for bedtime stories",
            "calm" => "A calm, soothing voice that helps children relax",
            "energetic" => "An upbeat, engaging voice for adventure stories",
            "friendly" => "A friendly, approachable voice that children love",
            _ => "A warm, friendly voice perfect for bedtime stories"
        };
    }
}