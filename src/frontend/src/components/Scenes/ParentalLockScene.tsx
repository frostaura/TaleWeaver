import React, { useState } from 'react';
import './ParentalLockScene.css';

const ParentalLockScene: React.FC = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [enteredPin, setEnteredPin] = useState('');
  const [lockedModes, setLockedModes] = useState({
    quickPlay: false,
    customStory: false
  });
  const [showSetup, setShowSetup] = useState(false);
  const [error, setError] = useState('');

  const handlePinInput = (digit: string) => {
    if (showSetup) {
      if (pin.length < 4) {
        setPin(pin + digit);
      }
    } else if (enteredPin.length < 4) {
      setEnteredPin(enteredPin + digit);
    }
  };

  const handleConfirmPinInput = (digit: string) => {
    if (confirmPin.length < 4) {
      setConfirmPin(confirmPin + digit);
    }
  };

  const clearPin = () => {
    if (showSetup) {
      setPin('');
      setConfirmPin('');
    } else {
      setEnteredPin('');
    }
    setError('');
  };

  const setupParentalLock = () => {
    if (pin.length !== 4) {
      setError('PIN must be 4 digits');
      return;
    }
    if (pin !== confirmPin) {
      setError('PINs do not match');
      return;
    }
    setIsLocked(true);
    setShowSetup(false);
    setPin('');
    setConfirmPin('');
    setError('');
  };

  const verifyPin = () => {
    if (enteredPin === pin) {
      setIsLocked(false);
      setEnteredPin('');
      setError('');
    } else {
      setError('Incorrect PIN');
      setEnteredPin('');
    }
  };

  const toggleModeLock = (mode: 'quickPlay' | 'customStory') => {
    setLockedModes(prev => ({
      ...prev,
      [mode]: !prev[mode]
    }));
  };

  const renderKeypad = (currentPin: string, isConfirm: boolean = false) => (
    <div className="keypad">
      <div className="pin-display">
        {[0, 1, 2, 3].map(index => (
          <div
            key={index}
            className={`pin-digit ${index < currentPin.length ? 'filled' : ''}`}
          >
            {index < currentPin.length ? '●' : '○'}
          </div>
        ))}
      </div>
      
      <div className="keypad-buttons">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button
            key={num}
            className="keypad-btn"
            onClick={() => isConfirm ? handleConfirmPinInput(num.toString()) : handlePinInput(num.toString())}
            disabled={currentPin.length >= 4}
          >
            {num}
          </button>
        ))}
        <button className="keypad-btn keypad-clear" onClick={clearPin}>
          Clear
        </button>
        <button
          className="keypad-btn"
          onClick={() => isConfirm ? handleConfirmPinInput('0') : handlePinInput('0')}
          disabled={currentPin.length >= 4}
        >
          0
        </button>
        <button className="keypad-btn keypad-delete" onClick={() => {
          if (isConfirm) {
            setConfirmPin(confirmPin.slice(0, -1));
          } else if (showSetup) {
            setPin(pin.slice(0, -1));
          } else {
            setEnteredPin(enteredPin.slice(0, -1));
          }
        }}>
          ⌫
        </button>
      </div>
    </div>
  );

  return (
    <div className="parental-lock-scene">
      <div className="scene-content">
        <h1 className="scene-title">🔒 Parental Lock</h1>
        <p className="scene-subtitle">
          {isLocked ? 'Enter PIN to access locked modes' : 'Secure your app with parental controls'}
        </p>

        {!isLocked && !showSetup && (
          <div className="lock-setup">
            <div className="lock-info">
              <h3>🛡️ Set up Parental Controls</h3>
              <p>
                Create a 4-digit PIN to lock specific modes and ensure your child's safety.
                You can choose which modes to lock after setting up the PIN.
              </p>
              <ul className="lock-benefits">
                <li>🚫 Restrict access to certain story modes</li>
                <li>⏰ Set time limits for story generation</li>
                <li>🔍 Monitor story content and themes</li>
                <li>👨‍👩‍👧‍👦 Parent-only access to settings</li>
              </ul>
            </div>
            
            <button className="setup-btn" onClick={() => setShowSetup(true)}>
              🔧 Set Up PIN
            </button>
          </div>
        )}

        {showSetup && (
          <div className="pin-setup">
            <div className="setup-step">
              <h3>Create Your 4-Digit PIN</h3>
              {renderKeypad(pin)}
              
              {pin.length === 4 && (
                <div className="confirm-pin">
                  <h3>Confirm Your PIN</h3>
                  {renderKeypad(confirmPin, true)}
                </div>
              )}
              
              {error && <div className="error-message">{error}</div>}
              
              <div className="setup-actions">
                <button className="cancel-btn" onClick={() => {
                  setShowSetup(false);
                  clearPin();
                }}>
                  Cancel
                </button>
                {pin.length === 4 && confirmPin.length === 4 && (
                  <button className="confirm-btn" onClick={setupParentalLock}>
                    ✅ Enable Lock
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {isLocked && (
          <div className="pin-entry">
            <div className="locked-status">
              <div className="lock-icon">🔒</div>
              <h3>Enter PIN to Continue</h3>
              {renderKeypad(enteredPin)}
              
              {error && <div className="error-message">{error}</div>}
              
              {enteredPin.length === 4 && (
                <button className="verify-btn" onClick={verifyPin}>
                  🔓 Unlock
                </button>
              )}
            </div>
          </div>
        )}

        {!isLocked && !showSetup && (
          <div className="lock-controls">
            <h3>📱 Mode Controls</h3>
            <div className="mode-controls">
              <div className="mode-control">
                <div className="mode-info">
                  <span className="mode-icon">⚡</span>
                  <span className="mode-name">Quick Play</span>
                </div>
                <button
                  className={`lock-toggle ${lockedModes.quickPlay ? 'locked' : 'unlocked'}`}
                  onClick={() => toggleModeLock('quickPlay')}
                >
                  {lockedModes.quickPlay ? '🔒 Locked' : '🔓 Unlocked'}
                </button>
              </div>
              
              <div className="mode-control">
                <div className="mode-info">
                  <span className="mode-icon">🎨</span>
                  <span className="mode-name">Custom Story</span>
                </div>
                <button
                  className={`lock-toggle ${lockedModes.customStory ? 'locked' : 'unlocked'}`}
                  onClick={() => toggleModeLock('customStory')}
                >
                  {lockedModes.customStory ? '🔒 Locked' : '🔓 Unlocked'}
                </button>
              </div>
            </div>
            
            <div className="lock-actions">
              <button className="disable-lock-btn" onClick={() => setShowSetup(true)}>
                🔧 Change PIN
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentalLockScene;