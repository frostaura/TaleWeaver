import React from 'react';
import './SettingsScene.css';

const SettingsScene: React.FC = () => {
  return (
    <div className="settings-scene">
      <div className="scene-content">
        <h1 className="scene-title">⚙️ Settings</h1>
        <p className="scene-subtitle">Customize your TaleWeaver experience</p>
        
        <div className="settings-grid">
          <div className="setting-item">
            <h3>🔊 Audio Settings</h3>
            <div className="setting-controls">
              <label>Volume</label>
              <input type="range" min="0" max="100" defaultValue="75" />
            </div>
            <div className="setting-controls">
              <label>Voice Type</label>
              <select defaultValue="friendly">
                <option value="friendly">Friendly</option>
                <option value="gentle">Gentle</option>
                <option value="storyteller">Storyteller</option>
              </select>
            </div>
          </div>
          
          <div className="setting-item">
            <h3>🎨 Theme Settings</h3>
            <div className="setting-controls">
              <label>
                <input type="checkbox" defaultChecked />
                Night Sky Theme
              </label>
            </div>
            <div className="setting-controls">
              <label>
                <input type="checkbox" defaultChecked />
                Animated Stars
              </label>
            </div>
          </div>
          
          <div className="setting-item">
            <h3>👶 Child Profile</h3>
            <div className="setting-controls">
              <label>Child's Name</label>
              <input type="text" placeholder="Enter name" />
            </div>
            <div className="setting-controls">
              <label>Age</label>
              <select defaultValue="5">
                <option value="3">3 years</option>
                <option value="4">4 years</option>
                <option value="5">5 years</option>
                <option value="6">6 years</option>
                <option value="7">7 years</option>
                <option value="8">8 years</option>
              </select>
            </div>
          </div>
          
          <div className="setting-item">
            <h3>🛡️ Safety Settings</h3>
            <div className="setting-controls">
              <label>
                <input type="checkbox" defaultChecked />
                Content Filtering
              </label>
            </div>
            <div className="setting-controls">
              <label>
                <input type="checkbox" />
                Parental Controls
              </label>
            </div>
          </div>
        </div>
        
        <div className="settings-actions">
          <button className="save-button">Save Settings</button>
          <button className="reset-button">Reset to Default</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsScene;