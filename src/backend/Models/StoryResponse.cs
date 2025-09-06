namespace backend.Models;

public class StoryResponse
{
    public string StoryText { get; set; } = string.Empty;
    public string AudioUrl { get; set; } = string.Empty;
    public bool IsSafe { get; set; } = true;
    public string[]? SafetyWarnings { get; set; }
    public TimeSpan EstimatedDuration { get; set; }
    public TtsParameters TtsParameters { get; set; } = new();
}

public class TtsParameters
{
    public string VoiceName { get; set; } = "en_speaker_6"; // Default for parler-tts-mini
    public float Speed { get; set; } = 1.0f;
    public string Description { get; set; } = "A warm, friendly voice perfect for bedtime stories";
}

public class SafetyCheckResponse
{
    public bool IsSafe { get; set; }
    public string[]? Issues { get; set; }
    public string? Recommendation { get; set; }
}