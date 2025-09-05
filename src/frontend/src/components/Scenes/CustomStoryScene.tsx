import React, { useState } from 'react';
import './CustomStoryScene.css';

const CustomStoryScene: React.FC = () => {
  const [step, setStep] = useState(1);
  const [customSettings, setCustomSettings] = useState({
    childName: '',
    age: '5',
    theme: '',
    characters: [] as string[],
    setting: '',
    mood: '',
    length: 'medium'
  });

  const themes = [
    { id: 'adventure', name: 'Adventure', icon: '🗺️' },
    { id: 'magical', name: 'Magical', icon: '✨' },
    { id: 'friendship', name: 'Friendship', icon: '👫' },
    { id: 'nature', name: 'Nature', icon: '🌳' },
    { id: 'space', name: 'Space', icon: '🚀' },
    { id: 'underwater', name: 'Underwater', icon: '🌊' }
  ];

  const characters = [
    { id: 'unicorn', name: 'Unicorn', icon: '🦄' },
    { id: 'dragon', name: 'Dragon', icon: '🐉' },
    { id: 'fairy', name: 'Fairy', icon: '🧚' },
    { id: 'robot', name: 'Robot', icon: '🤖' },
    { id: 'bear', name: 'Bear', icon: '🐻' },
    { id: 'whale', name: 'Whale', icon: '🐋' }
  ];

  const settings = [
    { id: 'forest', name: 'Enchanted Forest', icon: '🌲' },
    { id: 'castle', name: 'Magic Castle', icon: '🏰' },
    { id: 'ocean', name: 'Deep Ocean', icon: '🌊' },
    { id: 'space', name: 'Outer Space', icon: '🌌' },
    { id: 'village', name: 'Cozy Village', icon: '🏘️' },
    { id: 'mountain', name: 'Tall Mountains', icon: '⛰️' }
  ];

  const handleInputChange = (field: string, value: string | string[]) => {
    setCustomSettings(prev => ({ ...prev, [field]: value }));
  };

  const toggleCharacter = (characterId: string) => {
    const updatedCharacters = customSettings.characters.includes(characterId)
      ? customSettings.characters.filter(id => id !== characterId)
      : [...customSettings.characters, characterId];
    handleInputChange('characters', updatedCharacters);
  };

  const generateCustomStory = () => {
    // Simulate custom story generation
    alert('Generating your custom story with these settings!');
  };

  return (
    <div className="custom-story-scene">
      <div className="scene-content">
        <h1 className="scene-title">🎨 Custom Story</h1>
        <p className="scene-subtitle">Create a personalized story just for you</p>
        
        <div className="custom-form">
          {step === 1 && (
            <div className="form-step">
              <h3>📝 Tell us about the listener</h3>
              <div className="input-group">
                <label>Child's Name</label>
                <input
                  type="text"
                  value={customSettings.childName}
                  onChange={(e) => handleInputChange('childName', e.target.value)}
                  placeholder="Enter child's name"
                />
              </div>
              <div className="input-group">
                <label>Age</label>
                <select
                  value={customSettings.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                >
                  <option value="3">3 years</option>
                  <option value="4">4 years</option>
                  <option value="5">5 years</option>
                  <option value="6">6 years</option>
                  <option value="7">7 years</option>
                  <option value="8">8 years</option>
                  <option value="9">9 years</option>
                  <option value="10">10 years</option>
                </select>
              </div>
              <button className="next-btn" onClick={() => setStep(2)}>
                Next Step ➡️
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <h3>🎭 Choose a theme</h3>
              <div className="option-grid">
                {themes.map(theme => (
                  <button
                    key={theme.id}
                    className={`option-btn ${customSettings.theme === theme.id ? 'selected' : ''}`}
                    onClick={() => handleInputChange('theme', theme.id)}
                  >
                    <span className="option-icon">{theme.icon}</span>
                    <span className="option-name">{theme.name}</span>
                  </button>
                ))}
              </div>
              <div className="step-navigation">
                <button className="prev-btn" onClick={() => setStep(1)}>
                  ⬅️ Previous
                </button>
                <button className="next-btn" onClick={() => setStep(3)}>
                  Next Step ➡️
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <h3>👥 Pick characters (choose up to 3)</h3>
              <div className="option-grid">
                {characters.map(character => (
                  <button
                    key={character.id}
                    className={`option-btn ${customSettings.characters.includes(character.id) ? 'selected' : ''}`}
                    onClick={() => toggleCharacter(character.id)}
                    disabled={customSettings.characters.length >= 3 && !customSettings.characters.includes(character.id)}
                  >
                    <span className="option-icon">{character.icon}</span>
                    <span className="option-name">{character.name}</span>
                  </button>
                ))}
              </div>
              <p className="selection-info">
                Selected: {customSettings.characters.length}/3
              </p>
              <div className="step-navigation">
                <button className="prev-btn" onClick={() => setStep(2)}>
                  ⬅️ Previous
                </button>
                <button className="next-btn" onClick={() => setStep(4)}>
                  Next Step ➡️
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="form-step">
              <h3>🏞️ Choose a setting</h3>
              <div className="option-grid">
                {settings.map(setting => (
                  <button
                    key={setting.id}
                    className={`option-btn ${customSettings.setting === setting.id ? 'selected' : ''}`}
                    onClick={() => handleInputChange('setting', setting.id)}
                  >
                    <span className="option-icon">{setting.icon}</span>
                    <span className="option-name">{setting.name}</span>
                  </button>
                ))}
              </div>
              <div className="step-navigation">
                <button className="prev-btn" onClick={() => setStep(3)}>
                  ⬅️ Previous
                </button>
                <button className="next-btn" onClick={() => setStep(5)}>
                  Final Step ➡️
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="form-step">
              <h3>⚙️ Story preferences</h3>
              <div className="preferences">
                <div className="input-group">
                  <label>Story Mood</label>
                  <select
                    value={customSettings.mood}
                    onChange={(e) => handleInputChange('mood', e.target.value)}
                  >
                    <option value="">Select mood</option>
                    <option value="cheerful">Cheerful & Upbeat</option>
                    <option value="calm">Calm & Peaceful</option>
                    <option value="exciting">Exciting & Adventurous</option>
                    <option value="gentle">Gentle & Soothing</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Story Length</label>
                  <select
                    value={customSettings.length}
                    onChange={(e) => handleInputChange('length', e.target.value)}
                  >
                    <option value="short">Short (2-3 minutes)</option>
                    <option value="medium">Medium (4-5 minutes)</option>
                    <option value="long">Long (6-8 minutes)</option>
                  </select>
                </div>
              </div>
              <div className="step-navigation">
                <button className="prev-btn" onClick={() => setStep(4)}>
                  ⬅️ Previous
                </button>
                <button className="generate-custom-btn" onClick={generateCustomStory}>
                  ✨ Generate Custom Story
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="progress-indicator">
          <div className="progress-steps">
            {[1, 2, 3, 4, 5].map(num => (
              <div
                key={num}
                className={`progress-step ${step >= num ? 'completed' : ''} ${step === num ? 'active' : ''}`}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomStoryScene;