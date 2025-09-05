import React, { useState } from 'react';
import './QuickPlayScene.css';

const QuickPlayScene: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyGenerated, setStoryGenerated] = useState(false);

  const handleQuickPlay = () => {
    setIsGenerating(true);
    // Simulate story generation
    setTimeout(() => {
      setIsGenerating(false);
      setStoryGenerated(true);
    }, 2000);
  };

  const handleNewStory = () => {
    setStoryGenerated(false);
  };

  return (
    <div className="quickplay-scene">
      <div className="scene-content">
        <h1 className="scene-title">⚡ Quick Play</h1>
        <p className="scene-subtitle">Instantly generate a magical bedtime story</p>
        
        {!storyGenerated ? (
          <div className="quick-play-options">
            <div className="quick-themes">
              <h3>Choose a Quick Theme:</h3>
              <div className="theme-buttons">
                <button className="theme-btn">🦄 Magical Adventure</button>
                <button className="theme-btn">🌙 Peaceful Dreams</button>
                <button className="theme-btn">🚀 Space Explorer</button>
                <button className="theme-btn">🐻 Forest Friends</button>
                <button className="theme-btn">🏰 Fairy Tale</button>
                <button className="theme-btn">🌊 Ocean Adventure</button>
              </div>
            </div>
            
            <div className="generate-section">
              <button 
                className={`generate-btn ${isGenerating ? 'generating' : ''}`}
                onClick={handleQuickPlay}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <span className="spinner"></span>
                    Creating Your Story...
                  </>
                ) : (
                  <>
                    ⭐ Generate Story Now
                  </>
                )}
              </button>
              
              <p className="quick-hint">
                Perfect for bedtime! Stories are automatically age-appropriate and last 3-5 minutes.
              </p>
            </div>
          </div>
        ) : (
          <div className="story-result">
            <div className="story-preview">
              <h3>🌟 Your Story: "Luna's Moonlight Journey"</h3>
              <p className="story-text">
                Once upon a time, in a cozy little house at the edge of a magical forest, 
                lived a curious little girl named Luna. Every night, she would look out her 
                window at the twinkling stars and wonder what adventures awaited among them...
              </p>
              <div className="story-controls">
                <button className="play-btn">▶️ Play Story</button>
                <button className="pause-btn">⏸️ Pause</button>
                <button className="restart-btn">🔄 Restart</button>
              </div>
              <div className="story-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '0%'}}></div>
                </div>
                <span className="progress-time">0:00 / 4:32</span>
              </div>
            </div>
            
            <div className="story-actions">
              <button className="new-story-btn" onClick={handleNewStory}>
                ✨ Generate Another Story
              </button>
              <button className="save-story-btn">
                💾 Save Story
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickPlayScene;