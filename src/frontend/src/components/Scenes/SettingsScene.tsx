import React, { useState } from 'react';
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
  Divider,
  Alert
} from 'antd';
import { 
  SoundOutlined, 
  BgColorsOutlined, 
  UserOutlined, 
  SafetyOutlined,
  CheckOutlined,
  LockOutlined
} from '@ant-design/icons';
import './SettingsScene.css';
import ParentalGate from '../ParentalGate';

const { Title, Paragraph } = Typography;

const SettingsScene: React.FC = () => {
  const [showParentalGate, setShowParentalGate] = useState(false);
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  const handleSensitiveAction = (action: string) => {
    setPendingAction(action);
    setShowParentalGate(true);
  };

  const handleParentalGateSuccess = () => {
    setShowParentalGate(false);
    // Handle the pending action
    console.log(`Executing action: ${pendingAction}`);
    setPendingAction(null);
  };

  const handleParentalGateCancel = () => {
    setShowParentalGate(false);
    setPendingAction(null);
  };

  const handlePrivacyPolicyClick = () => {
    // In a real app, this might navigate to a privacy policy view
    // For now, we'll show an alert
    alert('Privacy policy would be shown here. In the full app, this would navigate to the privacy policy scene.');
  };

  if (showParentalGate) {
    return (
      <ParentalGate
        onSuccess={handleParentalGateSuccess}
        onCancel={handleParentalGateCancel}
        title="Settings Access"
        description="Parent verification required to modify settings"
      />
    );
  }
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
          
          <Col xs={24} md={12} style={{ marginBottom: '16px' }}>
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
          
          <Col xs={24} md={12} style={{ marginBottom: '16px' }}>
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
          
          <Col xs={24} md={12} style={{ marginBottom: '16px' }}>
            <Card 
              title={<><SafetyOutlined /> Safety Settings</>}
              style={{ height: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }} size="large">
                <Checkbox defaultChecked>Content Filtering</Checkbox>
                <Checkbox>Parental Controls</Checkbox>
                <Button 
                  icon={<LockOutlined />}
                  onClick={() => handleSensitiveAction('modify-safety')}
                  style={{ marginTop: '8px' }}
                >
                  Modify Safety Settings
                </Button>
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} md={12} style={{ marginBottom: '16px' }}>
            <Card 
              title={<><CheckOutlined /> Privacy & Legal</>}
              style={{ height: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }} size="large">
                <Alert
                  message="Your privacy is protected"
                  description="No personal data is collected or shared"
                  type="success"
                  showIcon
                />
                <Button 
                  type="link" 
                  icon={<CheckOutlined />}
                  onClick={handlePrivacyPolicyClick}
                  style={{ padding: '0', height: 'auto' }}
                >
                  View Privacy Policy
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
        
        <Divider />
        
        <Row justify="center" gutter={16}>
          <Col>
            <Button 
              type="primary" 
              size="large"
              onClick={() => handleSensitiveAction('save-settings')}
            >
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