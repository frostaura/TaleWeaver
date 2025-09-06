namespace backend.Models;

public class StoryRequest
{
    public ParentalSettings ParentalSettings { get; set; } = new();
    public string? Theme { get; set; }
    public string? CharacterName { get; set; }
    public string? Setting { get; set; }
    public string[]? CustomElements { get; set; }
}

public class ContinueStoryRequest
{
    public ParentalSettings ParentalSettings { get; set; } = new();
    public string ExistingStory { get; set; } = string.Empty;
    public string? Direction { get; set; } // e.g., "make it more exciting", "introduce a new character"
}

public class CustomStoryRequest
{
    public ParentalSettings ParentalSettings { get; set; } = new();
    public string MainCharacter { get; set; } = string.Empty;
    public string Setting { get; set; } = string.Empty;
    public string Plot { get; set; } = string.Empty;
    public string[]? AdditionalCharacters { get; set; }
    public string? MoralLesson { get; set; }
}