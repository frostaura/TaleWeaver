import React, { useState } from 'react';
import { 
  Button, 
  Typography, 
  Row, 
  Col, 
  Card, 
  Space, 
  Progress, 
  Spin 
} from 'antd';
import { 
  PlayCircleOutlined, 
  PauseOutlined, 
  RedoOutlined, 
  StarOutlined, 
  SaveOutlined,
  LoadingOutlined 
} from '@ant-design/icons';
import './QuickPlayScene.css';

const { Title, Paragraph } = Typography;

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

  const themeOptions = [
    { icon: '🦄', label: 'Magical Adventure' },
    { icon: '🌙', label: 'Peaceful Dreams' },
    { icon: '🚀', label: 'Space Explorer' },
    { icon: '🐻', label: 'Forest Friends' },
    { icon: '🏰', label: 'Fairy Tale' },
    { icon: '🌊', label: 'Ocean Adventure' }
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
        
        {!storyGenerated ? (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card title="Choose a Quick Theme:" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <Row gutter={[16, 16]}>
                {themeOptions.map((theme, index) => (
                  <Col xs={12} md={8} key={index}>
                    <Button 
                      block 
                      size="large" 
                      style={{ height: '60px', fontSize: '16px' }}
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
            <Card 
              title={<><StarOutlined /> Your Story: "Luna's Moonlight Journey"</>}
              style={{ maxWidth: '800px', margin: '0 auto' }}
            >
              <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
                Once upon a time, in a cozy little house at the edge of a magical forest, 
                lived a curious little girl named Luna. Every night, she would look out her 
                window at the twinkling stars and wonder what adventures awaited among them...
              </Paragraph>
              
              <Row gutter={16} style={{ marginBottom: '16px' }}>
                <Col>
                  <Button type="primary" icon={<PlayCircleOutlined />}>
                    Play Story
                  </Button>
                </Col>
                <Col>
                  <Button icon={<PauseOutlined />}>
                    Pause
                  </Button>
                </Col>
                <Col>
                  <Button icon={<RedoOutlined />}>
                    Restart
                  </Button>
                </Col>
              </Row>
              
              <div style={{ marginBottom: '16px' }}>
                <Progress percent={0} showInfo={false} />
                <div style={{ textAlign: 'center', marginTop: '8px', color: 'rgba(255, 255, 255, 0.65)' }}>
                  0:00 / 4:32
                </div>
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