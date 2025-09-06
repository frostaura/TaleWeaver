import React, { useState } from 'react';
import { 
  Typography, 
  Card, 
  Button, 
  Space, 
  Row, 
  Col,
  Alert,
  Divider
} from 'antd';
import { 
  CrownOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  LockOutlined
} from '@ant-design/icons';
import ParentalGate from '../ParentalGate';

const { Title, Paragraph, Text } = Typography;

const UpgradeScene: React.FC = () => {
  const [showParentalGate, setShowParentalGate] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleUpgradeClick = (planType: string) => {
    setSelectedPlan(planType);
    setShowParentalGate(true);
  };

  const handleParentalGateSuccess = () => {
    setShowParentalGate(false);
    // Here you would integrate with actual purchase system
    // For now, just show what would happen
    console.log(`Would initiate purchase for ${selectedPlan}`);
    alert('This would redirect to the App Store/Google Play purchase flow.');
  };

  const handleParentalGateCancel = () => {
    setShowParentalGate(false);
    setSelectedPlan(null);
  };

  if (showParentalGate) {
    return (
      <ParentalGate
        onSuccess={handleParentalGateSuccess}
        onCancel={handleParentalGateCancel}
        title="Purchase Verification"
        description="Verify that you want to make this purchase"
      />
    );
  }

  return (
    <div className="upgrade-scene" style={{ padding: '20px', maxHeight: '100vh', overflowY: 'auto' }}>
      <div className="scene-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Title level={1} style={{ textAlign: 'center', color: 'white', marginBottom: '8px' }}>
          👑 Upgrade TaleWeaver
        </Title>
        <Paragraph style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.75)', fontSize: '16px', marginBottom: '32px' }}>
          Unlock unlimited magical stories for your child
        </Paragraph>

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Alert
            message="Parent Purchase Required"
            description="All purchases require parental verification and go through secure App Store/Google Play billing"
            type="info"
            icon={<InfoCircleOutlined />}
            showIcon
          />

          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} lg={12}>
              <Card
                style={{ height: '100%', textAlign: 'center' }}
                className="free-plan-card"
              >
                <Space direction="vertical" size={16} style={{ width: '100%' }}>
                  <Title level={3} style={{ color: 'white', margin: 0 }}>
                    ✨ Free Plan
                  </Title>
                  <Text style={{ fontSize: '24px', color: '#52c41a' }}>$0</Text>
                  
                  <Divider />
                  
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                      <Text>5 stories per day</Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                      <Text>Basic personalization</Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                      <Text>Safe, age-appropriate content</Text>
                    </div>
                  </Space>
                  
                  <Button size="large" disabled>
                    Current Plan
                  </Button>
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card
                style={{ 
                  height: '100%', 
                  textAlign: 'center',
                  border: '2px solid #1890ff',
                  background: 'linear-gradient(145deg, rgba(24,144,255,0.1) 0%, rgba(24,144,255,0.05) 100%)'
                }}
                className="premium-plan-card"
              >
                <Space direction="vertical" size={16} style={{ width: '100%' }}>
                  <div>
                    <CrownOutlined style={{ fontSize: '32px', color: '#faad14', marginBottom: '8px' }} />
                    <Title level={3} style={{ color: 'white', margin: 0 }}>
                      🌟 Infinite Stories
                    </Title>
                  </div>
                  <Text style={{ fontSize: '24px', color: '#1890ff' }}>$4.99/month</Text>
                  
                  <Divider />
                  
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                      <Text><strong>Unlimited story generation</strong></Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                      <Text><strong>Serialized story continuations</strong></Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                      <Text>Advanced personalization</Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                      <Text>Premium voice narration</Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                      <Text>Story history & favorites</Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                      <Text>Priority support</Text>
                    </div>
                  </Space>
                  
                  <Button 
                    type="primary" 
                    size="large" 
                    icon={<CrownOutlined />}
                    onClick={() => handleUpgradeClick('premium')}
                    style={{ marginTop: '16px' }}
                  >
                    Upgrade Now
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>

          <Card title={<><LockOutlined /> Purchase Information</>}>
            <Space direction="vertical" size={16} style={{ width: '100%' }}>
              <Alert
                message="What you get with Infinite Stories"
                description="Upgrade unlocks unlimited story generation and advanced features. Your child can continue their favorite stories across multiple sessions, creating ongoing adventures."
                type="success"
                showIcon
              />
              
              <div>
                <Text strong>Important Purchase Details:</Text>
                <ul style={{ color: 'rgba(255, 255, 255, 0.85)', marginTop: '8px' }}>
                  <li>All payments are processed securely through App Store or Google Play</li>
                  <li>Subscription automatically renews unless cancelled</li>
                  <li>Cancel anytime in your App Store/Google Play account settings</li>
                  <li>No external payment methods or links</li>
                  <li>Family sharing supported where available</li>
                </ul>
              </div>

              <Alert
                message="Child Safety"
                description="Children cannot make purchases. All purchases require parental verification through secure gates."
                type="info"
                showIcon
              />
            </Space>
          </Card>

          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              By upgrading, you agree to our Terms of Service and Privacy Policy.<br />
              Subscription managed through your App Store/Google Play account.
            </Text>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default UpgradeScene;