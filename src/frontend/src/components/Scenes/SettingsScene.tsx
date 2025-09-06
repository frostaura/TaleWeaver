import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Slider, 
  Select, 
  Checkbox, 
  Button, 
  Typography, 
  Space,
  Divider,
  message,
  Tag 
} from 'antd';
import { 
  SoundOutlined, 
  BgColorsOutlined, 
  UserOutlined, 
  SafetyOutlined 
} from '@ant-design/icons';
import { getDefaultParentalSettings, saveParentalSettings, type ParentalSettings } from '../../services/api';
import './SettingsScene.css';

const { Title, Paragraph } = Typography;

const SettingsScene: React.FC = () => {
  const [settings, setSettings] = useState<ParentalSettings>(getDefaultParentalSettings());

  useEffect(() => {
    // Load settings from localStorage on component mount
    setSettings(getDefaultParentalSettings());
  }, []);

  const handleSaveSettings = () => {
    saveParentalSettings(settings);
    message.success('Settings saved successfully!');
  };

  const handleResetSettings = () => {
    const defaultSettings = {
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
    setSettings(defaultSettings);
    message.info('Settings reset to defaults');
  };

  const handleThemeChange = (theme: string, checked: boolean) => {
    if (checked) {
      setSettings(prev => ({
        ...prev,
        allowedThemes: [...prev.allowedThemes.filter(t => t !== theme), theme]
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        allowedThemes: prev.allowedThemes.filter(t => t !== theme)
      }));
    }
  };

  const availableThemes = [
    'adventure', 'friendship', 'magic', 'animals', 'nature', 
    'fairy tales', 'space', 'ocean', 'forest', 'dreams'
  ];
  return (
    <div className="settings-scene">
      <div className="scene-content">
        <Title level={1} style={{ textAlign: 'center', color: 'white', marginBottom: '8px' }}>
          ⚙️ Settings
        </Title>
        <Paragraph style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.75)', fontSize: '16px', marginBottom: '32px' }}>
          Customize your TaleWeaver experience
        </Paragraph>
        
        <Row gutter={[16, 16]} justify="center" style={{ margin: '0 -8px' }}>
          <Col xs={24} md={12} style={{ marginBottom: '16px' }}>
            <Card 
              title={<><SoundOutlined /> Audio Settings</>}
              style={{ height: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }} size="large">
                <div>
                  <Paragraph strong>Story Length (minutes)</Paragraph>
                  <Slider 
                    min={2} 
                    max={10} 
                    value={settings.maxStoryLength}
                    onChange={(value) => setSettings(prev => ({ ...prev, maxStoryLength: value }))}
                    tooltip={{ formatter: (value) => `${value} min` }} 
                  />
                </div>
                <div>
                  <Paragraph strong>Voice Type</Paragraph>
                  <Select 
                    value={settings.voiceType}
                    onChange={(value) => setSettings(prev => ({ ...prev, voiceType: value }))}
                    style={{ width: '100%' }}
                    options={[
                      { value: 'friendly', label: 'Friendly' },
                      { value: 'warm', label: 'Warm' },
                      { value: 'calm', label: 'Calm' },
                      { value: 'energetic', label: 'Energetic' }
                    ]}
                  />
                </div>
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} md={12} style={{ marginBottom: '16px' }}>
            <Card 
              title={<><BgColorsOutlined /> Allowed Themes</>}
              style={{ height: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }} size="large">
                <div>
                  <Paragraph strong>Select themes for stories:</Paragraph>
                  <Space size={[8, 8]} wrap>
                    {availableThemes.map(theme => (
                      <Tag.CheckableTag
                        key={theme}
                        checked={settings.allowedThemes.includes(theme)}
                        onChange={(checked) => handleThemeChange(theme, checked)}
                      >
                        {theme}
                      </Tag.CheckableTag>
                    ))}
                  </Space>
                </div>
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} md={12} style={{ marginBottom: '16px' }}>
            <Card 
              title={<><UserOutlined /> Child Profile</>}
              style={{ height: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }} size="large">
                <div>
                  <Paragraph strong>Child's Age</Paragraph>
                  <Select 
                    value={settings.childAge.toString()}
                    onChange={(value) => setSettings(prev => ({ ...prev, childAge: parseInt(value) }))}
                    style={{ width: '100%' }}
                    options={[
                      { value: '3', label: '3 years' },
                      { value: '4', label: '4 years' },
                      { value: '5', label: '5 years' },
                      { value: '6', label: '6 years' },
                      { value: '7', label: '7 years' },
                      { value: '8', label: '8 years' },
                      { value: '9', label: '9 years' },
                      { value: '10', label: '10 years' }
                    ]}
                  />
                </div>
                <div>
                  <Paragraph strong>Language</Paragraph>
                  <Select 
                    value={settings.languagePreference}
                    onChange={(value) => setSettings(prev => ({ ...prev, languagePreference: value }))}
                    style={{ width: '100%' }}
                    options={[
                      { value: 'English', label: 'English' },
                      { value: 'Spanish', label: 'Spanish' },
                      { value: 'French', label: 'French' },
                      { value: 'German', label: 'German' }
                    ]}
                  />
                </div>
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} md={12} style={{ marginBottom: '16px' }}>
            <Card 
              title={<><SafetyOutlined /> Safety Settings</>}
              style={{ height: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }} size="large">
                <Checkbox 
                  checked={settings.allowMagic}
                  onChange={(e) => setSettings(prev => ({ ...prev, allowMagic: e.target.checked }))}
                >
                  Allow Magic Elements
                </Checkbox>
                <Checkbox 
                  checked={settings.allowAdventure}
                  onChange={(e) => setSettings(prev => ({ ...prev, allowAdventure: e.target.checked }))}
                >
                  Allow Adventure Stories
                </Checkbox>
                <Checkbox 
                  checked={settings.allowScaryElements}
                  onChange={(e) => setSettings(prev => ({ ...prev, allowScaryElements: e.target.checked }))}
                >
                  Allow Mild Scary Elements
                </Checkbox>
              </Space>
            </Card>
          </Col>
        </Row>
        
        <Divider />
        
        <Row justify="center" gutter={16}>
          <Col>
            <Button type="primary" size="large" onClick={handleSaveSettings}>
              Save Settings
            </Button>
          </Col>
          <Col>
            <Button size="large" onClick={handleResetSettings}>
              Reset to Default
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SettingsScene;