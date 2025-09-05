import React from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Slider, 
  Select, 
  Checkbox, 
  Input, 
  Button, 
  Typography, 
  Space,
  Divider 
} from 'antd';
import { 
  SoundOutlined, 
  BgColorsOutlined, 
  UserOutlined, 
  SafetyOutlined 
} from '@ant-design/icons';
import './SettingsScene.css';

const { Title, Paragraph } = Typography;

const SettingsScene: React.FC = () => {
  return (
    <div className="settings-scene">
      <div className="scene-content">
        <Title level={1} style={{ textAlign: 'center', color: 'white', marginBottom: '8px' }}>
          ⚙️ Settings
        </Title>
        <Paragraph style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.75)', fontSize: '16px', marginBottom: '32px' }}>
          Customize your TaleWeaver experience
        </Paragraph>
        
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} md={12}>
            <Card 
              title={<><SoundOutlined /> Audio Settings</>}
              style={{ height: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }} size="large">
                <div>
                  <Paragraph strong>Volume</Paragraph>
                  <Slider defaultValue={75} tooltip={{ formatter: (value) => `${value}%` }} />
                </div>
                <div>
                  <Paragraph strong>Voice Type</Paragraph>
                  <Select 
                    defaultValue="friendly" 
                    style={{ width: '100%' }}
                    options={[
                      { value: 'friendly', label: 'Friendly' },
                      { value: 'gentle', label: 'Gentle' },
                      { value: 'storyteller', label: 'Storyteller' }
                    ]}
                  />
                </div>
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card 
              title={<><BgColorsOutlined /> Theme Settings</>}
              style={{ height: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }} size="large">
                <Checkbox defaultChecked>Night Sky Theme</Checkbox>
                <Checkbox defaultChecked>Animated Stars</Checkbox>
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card 
              title={<><UserOutlined /> Child Profile</>}
              style={{ height: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }} size="large">
                <div>
                  <Paragraph strong>Child's Name</Paragraph>
                  <Input placeholder="Enter name" />
                </div>
                <div>
                  <Paragraph strong>Age</Paragraph>
                  <Select 
                    defaultValue="5" 
                    style={{ width: '100%' }}
                    options={[
                      { value: '3', label: '3 years' },
                      { value: '4', label: '4 years' },
                      { value: '5', label: '5 years' },
                      { value: '6', label: '6 years' },
                      { value: '7', label: '7 years' },
                      { value: '8', label: '8 years' }
                    ]}
                  />
                </div>
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card 
              title={<><SafetyOutlined /> Safety Settings</>}
              style={{ height: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }} size="large">
                <Checkbox defaultChecked>Content Filtering</Checkbox>
                <Checkbox>Parental Controls</Checkbox>
              </Space>
            </Card>
          </Col>
        </Row>
        
        <Divider />
        
        <Row justify="center" gutter={16}>
          <Col>
            <Button type="primary" size="large">
              Save Settings
            </Button>
          </Col>
          <Col>
            <Button size="large">
              Reset to Default
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SettingsScene;