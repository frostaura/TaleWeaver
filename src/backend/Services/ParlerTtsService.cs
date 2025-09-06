using System.Text.Json;
using backend.Models;

namespace backend.Services;

public interface ITtsService
{
    Task<string> GenerateAudioAsync(string text, TtsParameters parameters);
}

public class ParlerTtsService : ITtsService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<ParlerTtsService> _logger;
    private readonly string _baseUrl;

    public ParlerTtsService(HttpClient httpClient, ILogger<ParlerTtsService> logger, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _logger = logger;
        _baseUrl = configuration.GetValue<string>("ParlerTtsUrl") ?? "http://parler-tts:5005";
    }

    public async Task<string> GenerateAudioAsync(string text, TtsParameters parameters)
    {
        try
        {
            var request = new
            {
                text = text,
                description = parameters.Description,
                speed = parameters.Speed
            };

            var json = JsonSerializer.Serialize(request);
            var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

            _logger.LogInformation("Generating audio for text length: {Length} with parameters: {Parameters}", 
                text.Length, JsonSerializer.Serialize(parameters));

            var response = await _httpClient.PostAsync($"{_baseUrl}/synthesize", content);
            response.EnsureSuccessStatusCode();

            var responseBytes = await response.Content.ReadAsByteArrayAsync();
            
            // In a real scenario, you might want to save this to a file storage service
            // and return a URL. For now, we'll return a base64 encoded audio data URL
            var base64Audio = Convert.ToBase64String(responseBytes);
            return $"data:audio/wav;base64,{base64Audio}";
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating audio with Parler-TTS");
            
            // Return empty string on error - the frontend can handle this gracefully
            return string.Empty;
        }
    }
}