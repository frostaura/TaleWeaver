// Types for API integration
export interface ParentalSettings {
  childAge: number;
  allowedThemes: string[];
  restrictedWords: string[];
  allowMagic: boolean;
  allowAdventure: boolean;
  allowScaryElements: boolean;
  languagePreference: string;
  voiceType: string;
  maxStoryLength: number;
}

export interface StoryRequest {
  parentalSettings: ParentalSettings;
  theme?: string;
  characterName?: string;
  setting?: string;
  customElements?: string[];
}

export interface ContinueStoryRequest {
  parentalSettings: ParentalSettings;
  existingStory: string;
  direction?: string;
}

export interface CustomStoryRequest {
  parentalSettings: ParentalSettings;
  mainCharacter: string;
  setting: string;
  plot: string;
  additionalCharacters?: string[];
  moralLesson?: string;
}

export interface StoryResponse {
  storyText: string;
  audioUrl: string;
  isSafe: boolean;
  safetyWarnings?: string[];
  estimatedDuration: string; // Will be timespan from backend
  ttsParameters: TtsParameters;
}

export interface TtsParameters {
  voiceName: string;
  speed: number;
  description: string;
}

// API service
class ApiService {
  private baseUrl: string;

  constructor() {
    // Try to detect if we're running in Docker or development
    this.baseUrl = import.meta.env.DEV 
      ? 'http://localhost:5000/api' 
      : '/api';
  }

  private async makeRequest<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async generateStory(request: StoryRequest): Promise<StoryResponse> {
    return this.makeRequest<StoryResponse>('/story/generate', request);
  }

  async continueStory(request: ContinueStoryRequest): Promise<StoryResponse> {
    return this.makeRequest<StoryResponse>('/story/continue', request);
  }

  async generateCustomStory(request: CustomStoryRequest): Promise<StoryResponse> {
    return this.makeRequest<StoryResponse>('/story/custom', request);
  }

  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    const response = await fetch(`${this.baseUrl}/story/health`);
    return response.json();
  }
}

export const apiService = new ApiService();

// Helper function to get default parental settings
export function getDefaultParentalSettings(): ParentalSettings {
  const stored = localStorage.getItem('taleweaver-parental-settings');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Fall through to defaults
    }
  }

  return {
    childAge: 5,
    allowedThemes: ['adventure', 'friendship', 'magic', 'animals', 'nature'],
    restrictedWords: [],
    allowMagic: true,
    allowAdventure: true,
    allowScaryElements: false,
    languagePreference: 'English',
    voiceType: 'friendly',
    maxStoryLength: 5
  };
}

// Helper function to save parental settings
export function saveParentalSettings(settings: ParentalSettings): void {
  localStorage.setItem('taleweaver-parental-settings', JSON.stringify(settings));
}