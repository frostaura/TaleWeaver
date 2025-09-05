import React, { useState } from 'react';
import { 
  Button, 
  Typography, 
  Card, 
  Space, 
  Row, 
  Col, 
  Switch, 
  Alert,
  message
} from 'antd';
import { 
  LockOutlined, 
  UnlockOutlined, 
  SettingOutlined,
  ThunderboltOutlined,
  BgColorsOutlined 
} from '@ant-design/icons';
import './ParentalLockScene.css';

const { Title, Paragraph } = Typography;

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
      message.error('PIN must be 4 digits');
      return;
    }
    if (pin !== confirmPin) {
      message.error('PINs do not match');
      return;
    }
    setIsLocked(true);
    setShowSetup(false);
    setPin('');
    setConfirmPin('');
    setError('');
    message.success('Parental lock enabled successfully!');
  };

  const verifyPin = () => {
    if (enteredPin === pin) {
      setIsLocked(false);
      setEnteredPin('');
      setError('');
      message.success('Parental lock disabled');
    } else {
      message.error('Incorrect PIN');
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
    <div style={{ maxWidth: '300px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '8px', 
        marginBottom: '24px',
        fontSize: '24px'
      }}>
        {[0, 1, 2, 3].map(index => (
          <span
            key={index}
            style={{ 
              color: index < currentPin.length ? '#1890ff' : 'rgba(255, 255, 255, 0.3)',
              fontSize: '32px'
            }}
          >
            {index < currentPin.length ? '●' : '○'}
          </span>
        ))}
      </div>
      
      <Row gutter={[8, 8]}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <Col span={8} key={num}>
            <Button
              block
              size="large"
              onClick={() => isConfirm ? handleConfirmPinInput(num.toString()) : handlePinInput(num.toString())}
              disabled={currentPin.length >= 4}
              style={{ height: '50px', fontSize: '18px' }}
            >
              {num}
            </Button>
          </Col>
        ))}
        <Col span={8}>
          <Button
            block
            size="large"
            onClick={clearPin}
            style={{ height: '50px' }}
          >
            Clear
          </Button>
        </Col>
        <Col span={8}>
          <Button
            block
            size="large"
            onClick={() => isConfirm ? handleConfirmPinInput('0') : handlePinInput('0')}
            disabled={currentPin.length >= 4}
            style={{ height: '50px', fontSize: '18px' }}
          >
            0
          </Button>
        </Col>
        <Col span={8}>
          <Button
            block
            size="large"
            onClick={() => {
              if (isConfirm) {
                setConfirmPin(confirmPin.slice(0, -1));
              } else if (showSetup) {
                setPin(pin.slice(0, -1));
              } else {
                setEnteredPin(enteredPin.slice(0, -1));
              }
            }}
            style={{ height: '50px', fontSize: '18px' }}
          >
            ⌫
          </Button>
        </Col>
      </Row>
    </div>
  );

  return (
    <div className="parental-lock-scene">
      <div className="scene-content">
        <Title level={1} style={{ textAlign: 'center', color: 'white', marginBottom: '8px' }}>
          🔒 Parental Lock
        </Title>
        <Paragraph style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.75)', fontSize: '16px', marginBottom: '32px' }}>
          {isLocked ? 'Enter PIN to access locked modes' : 'Secure your app with parental controls'}
        </Paragraph>

        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {!isLocked && !showSetup && (
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Card title={<><SettingOutlined /> Set up Parental Controls</>}>
                <Paragraph>
                  Create a 4-digit PIN to lock specific modes and ensure your child's safety.
                  You can choose which modes to lock after setting up the PIN.
                </Paragraph>
                <ul style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                  <li>🚫 Restrict access to certain story modes</li>
                  <li>⏰ Set time limits for story generation</li>
                  <li>🔍 Monitor story content and themes</li>
                  <li>👨‍👩‍👧‍👦 Parent-only access to settings</li>
                </ul>
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                  <Button 
                    type="primary" 
                    size="large" 
                    icon={<LockOutlined />}
                    onClick={() => setShowSetup(true)}
                  >
                    Set Up PIN
                  </Button>
                </div>
              </Card>

              <Card title="📱 Mode Controls">
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Space>
                        <ThunderboltOutlined style={{ fontSize: '20px' }} />
                        <span style={{ fontSize: '16px' }}>Quick Play</span>
                      </Space>
                    </Col>
                    <Col>
                      <Switch
                        checked={lockedModes.quickPlay}
                        onChange={() => toggleModeLock('quickPlay')}
                        checkedChildren="🔒"
                        unCheckedChildren="🔓"
                      />
                    </Col>
                  </Row>
                  
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Space>
                        <BgColorsOutlined style={{ fontSize: '20px' }} />
                        <span style={{ fontSize: '16px' }}>Custom Story</span>
                      </Space>
                    </Col>
                    <Col>
                      <Switch
                        checked={lockedModes.customStory}
                        onChange={() => toggleModeLock('customStory')}
                        checkedChildren="🔒"
                        unCheckedChildren="🔓"
                      />
                    </Col>
                  </Row>
                </Space>
                
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                  <Button icon={<SettingOutlined />} onClick={() => setShowSetup(true)}>
                    Change PIN
                  </Button>
                </div>
              </Card>
            </Space>
          )}

          {showSetup && (
            <Card title="Create Your 4-Digit PIN">
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {renderKeypad(pin)}
                
                {pin.length === 4 && (
                  <>
                    <Title level={4} style={{ textAlign: 'center', color: 'white' }}>
                      Confirm Your PIN
                    </Title>
                    {renderKeypad(confirmPin, true)}
                  </>
                )}
                
                {error && <Alert message={error} type="error" showIcon />}
                
                <Row justify="space-between" style={{ marginTop: '24px' }}>
                  <Col>
                    <Button 
                      size="large"
                      onClick={() => {
                        setShowSetup(false);
                        clearPin();
                      }}
                    >
                      Cancel
                    </Button>
                  </Col>
                  {pin.length === 4 && confirmPin.length === 4 && (
                    <Col>
                      <Button 
                        type="primary" 
                        size="large" 
                        icon={<LockOutlined />}
                        onClick={setupParentalLock}
                      >
                        Enable Lock
                      </Button>
                    </Col>
                  )}
                </Row>
              </Space>
            </Card>
          )}

          {isLocked && (
            <Card 
              title={<><LockOutlined /> Enter PIN to Continue</>}
              style={{ textAlign: 'center' }}
            >
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {renderKeypad(enteredPin)}
                
                {error && <Alert message={error} type="error" showIcon />}
                
                {enteredPin.length === 4 && (
                  <Button 
                    type="primary" 
                    size="large" 
                    icon={<UnlockOutlined />}
                    onClick={verifyPin}
                  >
                    Unlock
                  </Button>
                )}
              </Space>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentalLockScene;