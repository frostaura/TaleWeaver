namespace backend.Models;

public class ParentalSettings
{
    public int ChildAge { get; set; }
    public string[] AllowedThemes { get; set; } = Array.Empty<string>();
    public string[] RestrictedWords { get; set; } = Array.Empty<string>();
    public bool AllowMagic { get; set; } = true;
    public bool AllowAdventure { get; set; } = true;
    public bool AllowScaryElements { get; set; } = false;
    public string LanguagePreference { get; set; } = "English";
    public string VoiceType { get; set; } = "friendly"; // friendly, warm, calm, energetic
    public int MaxStoryLength { get; set; } = 5; // in minutes
}