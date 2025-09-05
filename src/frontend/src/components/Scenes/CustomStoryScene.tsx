import React, { useState } from 'react';
import { 
  Button, 
  Typography, 
  Input, 
  Select, 
  Card, 
  Row, 
  Col, 
  Steps, 
  Space,
  Badge,
  message
} from 'antd';
import { 
  ArrowRightOutlined, 
  ArrowLeftOutlined,
  EditOutlined,
  StarOutlined 
} from '@ant-design/icons';
import './CustomStoryScene.css';

const { Title, Paragraph } = Typography;
const { Step } = Steps;

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
    message.success('Generating your custom story with these settings!');
  };

  return (
    <div className="custom-story-scene">
      <div className="scene-content">
        <Title level={1} style={{ textAlign: 'center', color: 'white', marginBottom: '8px' }}>
          🎨 Custom Story
        </Title>
        <Paragraph style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.75)', fontSize: '16px', marginBottom: '32px' }}>
          Create a personalized story just for you
        </Paragraph>
        
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Steps current={step - 1} style={{ marginBottom: '32px' }}>
            <Step title="Listener Info" icon={<EditOutlined />} />
            <Step title="Theme" />
            <Step title="Characters" />
            <Step title="Setting" />
            <Step title="Preferences" />
          </Steps>

          <Card style={{ minHeight: '400px' }}>
            {step === 1 && (
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Title level={3}>📝 Tell us about the listener</Title>
                <Row gutter={16}>
                  <Col span={12}>
                    <Paragraph strong>Child's Name</Paragraph>
                    <Input
                      size="large"
                      value={customSettings.childName}
                      onChange={(e) => handleInputChange('childName', e.target.value)}
                      placeholder="Enter child's name"
                    />
                  </Col>
                  <Col span={12}>
                    <Paragraph strong>Age</Paragraph>
                    <Select
                      size="large"
                      style={{ width: '100%' }}
                      value={customSettings.age}
                      onChange={(value) => handleInputChange('age', value)}
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
                  </Col>
                </Row>
                <div style={{ textAlign: 'center', marginTop: '32px' }}>
                  <Button 
                    type="primary" 
                    size="large" 
                    icon={<ArrowRightOutlined />}
                    onClick={() => setStep(2)}
                  >
                    Next Step
                  </Button>
                </div>
              </Space>
            )}

            {step === 2 && (
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Title level={3}>🎭 Choose a theme</Title>
                <Row gutter={[16, 16]}>
                  {themes.map(theme => (
                    <Col xs={12} md={8} key={theme.id}>
                      <Button
                        block
                        size="large"
                        type={customSettings.theme === theme.id ? 'primary' : 'default'}
                        onClick={() => handleInputChange('theme', theme.id)}
                        style={{ height: '80px', fontSize: '16px' }}
                      >
                        <div>
                          <div style={{ fontSize: '24px', marginBottom: '4px' }}>{theme.icon}</div>
                          {theme.name}
                        </div>
                      </Button>
                    </Col>
                  ))}
                </Row>
                <Row justify="space-between" style={{ marginTop: '32px' }}>
                  <Col>
                    <Button 
                      size="large" 
                      icon={<ArrowLeftOutlined />}
                      onClick={() => setStep(1)}
                    >
                      Previous
                    </Button>
                  </Col>
                  <Col>
                    <Button 
                      type="primary" 
                      size="large" 
                      icon={<ArrowRightOutlined />}
                      onClick={() => setStep(3)}
                    >
                      Next Step
                    </Button>
                  </Col>
                </Row>
              </Space>
            )}

            {step === 3 && (
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Title level={3}>👥 Pick characters (choose up to 3)</Title>
                  <Paragraph>Selected: <Badge count={customSettings.characters.length} /> / 3</Paragraph>
                </div>
                <Row gutter={[16, 16]}>
                  {characters.map(character => (
                    <Col xs={12} md={8} key={character.id}>
                      <Button
                        block
                        size="large"
                        type={customSettings.characters.includes(character.id) ? 'primary' : 'default'}
                        disabled={customSettings.characters.length >= 3 && !customSettings.characters.includes(character.id)}
                        onClick={() => toggleCharacter(character.id)}
                        style={{ height: '80px', fontSize: '16px' }}
                      >
                        <div>
                          <div style={{ fontSize: '24px', marginBottom: '4px' }}>{character.icon}</div>
                          {character.name}
                        </div>
                      </Button>
                    </Col>
                  ))}
                </Row>
                <Row justify="space-between" style={{ marginTop: '32px' }}>
                  <Col>
                    <Button 
                      size="large" 
                      icon={<ArrowLeftOutlined />}
                      onClick={() => setStep(2)}
                    >
                      Previous
                    </Button>
                  </Col>
                  <Col>
                    <Button 
                      type="primary" 
                      size="large" 
                      icon={<ArrowRightOutlined />}
                      onClick={() => setStep(4)}
                    >
                      Next Step
                    </Button>
                  </Col>
                </Row>
              </Space>
            )}

            {step === 4 && (
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Title level={3}>🏞️ Choose a setting</Title>
                <Row gutter={[16, 16]}>
                  {settings.map(setting => (
                    <Col xs={12} md={8} key={setting.id}>
                      <Button
                        block
                        size="large"
                        type={customSettings.setting === setting.id ? 'primary' : 'default'}
                        onClick={() => handleInputChange('setting', setting.id)}
                        style={{ height: '80px', fontSize: '16px' }}
                      >
                        <div>
                          <div style={{ fontSize: '24px', marginBottom: '4px' }}>{setting.icon}</div>
                          {setting.name}
                        </div>
                      </Button>
                    </Col>
                  ))}
                </Row>
                <Row justify="space-between" style={{ marginTop: '32px' }}>
                  <Col>
                    <Button 
                      size="large" 
                      icon={<ArrowLeftOutlined />}
                      onClick={() => setStep(3)}
                    >
                      Previous
                    </Button>
                  </Col>
                  <Col>
                    <Button 
                      type="primary" 
                      size="large" 
                      icon={<ArrowRightOutlined />}
                      onClick={() => setStep(5)}
                    >
                      Final Step
                    </Button>
                  </Col>
                </Row>
              </Space>
            )}

            {step === 5 && (
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Title level={3}>⚙️ Story preferences</Title>
                <Row gutter={16}>
                  <Col span={12}>
                    <Paragraph strong>Story Mood</Paragraph>
                    <Select
                      size="large"
                      style={{ width: '100%' }}
                      value={customSettings.mood}
                      onChange={(value) => handleInputChange('mood', value)}
                      placeholder="Select mood"
                      options={[
                        { value: 'cheerful', label: 'Cheerful & Upbeat' },
                        { value: 'calm', label: 'Calm & Peaceful' },
                        { value: 'exciting', label: 'Exciting & Adventurous' },
                        { value: 'gentle', label: 'Gentle & Soothing' }
                      ]}
                    />
                  </Col>
                  <Col span={12}>
                    <Paragraph strong>Story Length</Paragraph>
                    <Select
                      size="large"
                      style={{ width: '100%' }}
                      value={customSettings.length}
                      onChange={(value) => handleInputChange('length', value)}
                      options={[
                        { value: 'short', label: 'Short (2-3 minutes)' },
                        { value: 'medium', label: 'Medium (4-5 minutes)' },
                        { value: 'long', label: 'Long (6-8 minutes)' }
                      ]}
                    />
                  </Col>
                </Row>
                <Row justify="space-between" style={{ marginTop: '32px' }}>
                  <Col>
                    <Button 
                      size="large" 
                      icon={<ArrowLeftOutlined />}
                      onClick={() => setStep(4)}
                    >
                      Previous
                    </Button>
                  </Col>
                  <Col>
                    <Button 
                      type="primary" 
                      size="large" 
                      icon={<StarOutlined />}
                      onClick={generateCustomStory}
                    >
                      Generate Custom Story
                    </Button>
                  </Col>
                </Row>
              </Space>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomStoryScene;