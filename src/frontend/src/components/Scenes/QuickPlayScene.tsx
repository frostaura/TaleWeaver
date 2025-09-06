import React, { useState } from 'react';
import { 
  Button, 
  Typography, 
  Row, 
  Col, 
  Card, 
  Space, 
  Spin,
  message,
  Alert 
} from 'antd';
import { 
  PlayCircleOutlined, 
  PauseOutlined, 
  StarOutlined, 
  SaveOutlined,
  LoadingOutlined,
  SoundOutlined 
} from '@ant-design/icons';
import { apiService, getDefaultParentalSettings, type StoryResponse } from '../../services/api';
import './QuickPlayScene.css';

const { Title, Paragraph } = Typography;

const QuickPlayScene: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [story, setStory] = useState<StoryResponse | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const handleQuickPlay = async () => {
    setIsGenerating(true);
    try {
      const parentalSettings = getDefaultParentalSettings();
      const request = {
        parentalSettings,
        theme: selectedTheme || 'magical adventure',
        characterName: 'Luna', // Default character name
        setting: 'enchanted forest'
      };

      const response = await apiService.generateStory(request);
      
      if (!response.isSafe) {
        message.warning('Story content needs adjustment. Please check your parental settings.');
        return;
      }

      setStory(response);
      message.success('Story generated successfully!');
    } catch (error) {
      console.error('Error generating story:', error);
      message.error('Failed to generate story. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNewStory = () => {
    setStory(null);
    setSelectedTheme(null);
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
      setIsPlaying(false);
    }
  };

  const handlePlayAudio = () => {
    if (!story?.audioUrl) {
      message.info('Audio is being generated. Please try again in a moment.');
      return;
    }

    if (currentAudio) {
      if (isPlaying) {
        currentAudio.pause();
        setIsPlaying(false);
      } else {
        currentAudio.play();
        setIsPlaying(true);
      }
    } else {
      const audio = new Audio(story.audioUrl);
      audio.onended = () => setIsPlaying(false);
      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);
      audio.play();
      setCurrentAudio(audio);
      setIsPlaying(true);
    }
  };

  const handleThemeSelect = (theme: string) => {
    setSelectedTheme(theme);
  };

  const themeOptions = [
    { icon: '🦄', label: 'Magical Adventure', value: 'magical adventure' },
    { icon: '🌙', label: 'Peaceful Dreams', value: 'peaceful dreams' },
    { icon: '🚀', label: 'Space Explorer', value: 'space adventure' },
    { icon: '🐻', label: 'Forest Friends', value: 'forest animals' },
    { icon: '🏰', label: 'Fairy Tale', value: 'fairy tale' },
    { icon: '🌊', label: 'Ocean Adventure', value: 'ocean adventure' }
  ];

  return (
    <div className="quickplay-scene">
      <div className="scene-content">
        <Title level={1} style={{ textAlign: 'center', color: 'white', marginBottom: '8px' }}>
          ⚡ Quick Play
        </Title>
        <Paragraph style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.75)', fontSize: '16px', marginBottom: '32px' }}>
          Instantly generate a magical bedtime story
        </Paragraph>
        
        {!story ? (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card title="Choose a Quick Theme:" style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '16px' }}>
              <Row gutter={[12, 12]}>
                {themeOptions.map((theme, index) => (
                  <Col xs={12} md={8} key={index}>
                    <Button 
                      block 
                      size="large" 
                      type={selectedTheme === theme.value ? 'primary' : 'default'}
                      onClick={() => handleThemeSelect(theme.value)}
                      style={{ 
                        height: '60px', 
                        fontSize: '16px',
                        borderColor: selectedTheme === theme.value ? '#646cff' : undefined
                      }}
                    >
                      {theme.icon} {theme.label}
                    </Button>
                  </Col>
                ))}
              </Row>
            </Card>
            
            <div style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
              <Button 
                type="primary" 
                size="large" 
                icon={isGenerating ? <Spin indicator={<LoadingOutlined spin />} /> : <StarOutlined />}
                onClick={handleQuickPlay}
                disabled={isGenerating}
                style={{ 
                  height: '60px', 
                  fontSize: '18px', 
                  fontWeight: 'bold',
                  marginBottom: '16px',
                  minWidth: '250px'
                }}
              >
                {isGenerating ? 'Creating Your Story...' : 'Generate Story Now'}
              </Button>
              
              <Paragraph style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                Perfect for bedtime! Stories are automatically age-appropriate and last 3-5 minutes.
              </Paragraph>
            </div>
          </Space>
        ) : (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {story.safetyWarnings && story.safetyWarnings.length > 0 && (
              <Alert
                message="Content Notice"
                description={story.safetyWarnings.join(', ')}
                type="warning"
                showIcon
                style={{ maxWidth: '800px', margin: '0 auto' }}
              />
            )}
            
            <Card 
              title={<><StarOutlined /> Your Personalized Story</>}
              style={{ maxWidth: '800px', margin: '0 auto' }}
            >
              <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
                {story.storyText}
              </Paragraph>
              
              <Row gutter={16} style={{ marginBottom: '16px' }}>
                <Col>
                  <Button 
                    type="primary" 
                    icon={isPlaying ? <PauseOutlined /> : <PlayCircleOutlined />}
                    onClick={handlePlayAudio}
                    disabled={!story.audioUrl}
                  >
                    {isPlaying ? 'Pause' : 'Play Story'}
                  </Button>
                </Col>
                {story.audioUrl && (
                  <Col>
                    <Button icon={<SoundOutlined />} disabled>
                      Voice: {story.ttsParameters.description}
                    </Button>
                  </Col>
                )}
              </Row>
              
              <div style={{ marginBottom: '16px', color: 'rgba(255, 255, 255, 0.65)' }}>
                <div>Estimated Duration: {story.estimatedDuration}</div>
                {story.audioUrl && (
                  <div style={{ marginTop: '8px' }}>
                    🎵 Audio ready to play
                  </div>
                )}
              </div>
            </Card>
            
            <Row justify="center" gutter={16}>
              <Col>
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<StarOutlined />}
                  onClick={handleNewStory}
                >
                  Generate Another Story
                </Button>
              </Col>
              <Col>
                <Button 
                  size="large" 
                  icon={<SaveOutlined />}
                  onClick={() => message.info('Save feature coming soon!')}
                >
                  Save Story
                </Button>
              </Col>
            </Row>
          </Space>
        )}
      </div>
    </div>
  );
};

export default QuickPlayScene;