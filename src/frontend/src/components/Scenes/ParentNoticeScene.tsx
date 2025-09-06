import React, { useState } from 'react';
import { 
  Typography, 
  Card, 
  Button, 
  Space, 
  Alert,
  Row,
  Col,
  Checkbox,
  Divider
} from 'antd';
import { 
  CheckOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  SettingOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

interface ParentNoticeSceneProps {
  onComplete?: () => void;
}

const ParentNoticeScene: React.FC<ParentNoticeSceneProps> = ({ onComplete }) => {
  const [parentConfirmation, setParentConfirmation] = useState(false);
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false);
  const [safetyUnderstood, setSafetyUnderstood] = useState(false);

  const isAllConfirmed = parentConfirmation && privacyAcknowledged && safetyUnderstood;

  const handleContinue = () => {
    if (isAllConfirmed && onComplete) {
      // Store that onboarding is complete
      localStorage.setItem('taleweaver-onboarding-complete', 'true');
      onComplete();
    }
  };

  return (
    <div className="parent-notice-scene" style={{ padding: '20px', maxHeight: '100vh', overflowY: 'auto' }}>
      <div className="scene-content" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <Title level={1} style={{ textAlign: 'center', color: 'white', marginBottom: '8px' }}>
          👨‍👩‍👧‍👦 Parent Notice
        </Title>
        <Paragraph style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.75)', fontSize: '16px', marginBottom: '32px' }}>
          Welcome to TaleWeaver! Please review this important information before your child uses the app.
        </Paragraph>

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Alert
            message="Important: This app is designed for children, but parents are in control"
            description="Please review all settings and parental controls before allowing your child to use TaleWeaver."
            type="warning"
            icon={<InfoCircleOutlined />}
            showIcon
          />

          <Card title={<><CheckOutlined /> About TaleWeaver</>}>
            <Space direction="vertical" size={16} style={{ width: '100%' }}>
              <Paragraph>
                TaleWeaver is an AI-powered bedtime story app designed specifically for children ages 3-8. 
                We create personalized, magical stories while prioritizing your child's safety and privacy.
              </Paragraph>
              
              <div>
                <Text strong>Key Features:</Text>
                <ul style={{ color: 'rgba(255, 255, 255, 0.85)', marginTop: '8px' }}>
                  <li>🎭 Personalized story generation</li>
                  <li>🔒 Advanced parental controls</li>
                  <li>🛡️ Privacy-first design (no data leaves your device)</li>
                  <li>✅ Age-appropriate content filtering</li>
                  <li>🎵 Optional voice narration</li>
                </ul>
              </div>
            </Space>
          </Card>

          <Card title={<><CheckOutlined /> AI Safety & Content</>}>
            <Space direction="vertical" size={16} style={{ width: '100%' }}>
              <Alert
                message="All stories are generated safely with family-friendly guidelines"
                type="success"
                showIcon
              />
              
              <div>
                <Text strong>Our AI Content Guidelines:</Text>
                <ul style={{ color: 'rgba(255, 255, 255, 0.85)', marginTop: '8px' }}>
                  <li>Stories are filtered for age-appropriate content</li>
                  <li>No violence, scary themes, or inappropriate material</li>
                  <li>Positive values and educational themes encouraged</li>
                  <li>Content is reviewed by AI safety systems</li>
                </ul>
              </div>

              <Alert
                message="Parent Supervision Recommended"
                description="While our AI is designed to generate safe content, parents should supervise reading for younger children and review stories as needed."
                type="info"
                showIcon
              />
            </Space>
          </Card>

          <Card title={<><SettingOutlined /> Parental Controls Available</>}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <div>
                  <Text strong>🔒 Secure Access</Text>
                  <ul style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '14px' }}>
                    <li>PIN-protected settings</li>
                    <li>Parental gates for purchases</li>
                    <li>Child-proof sensitive actions</li>
                  </ul>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div>
                  <Text strong>🛡️ Privacy Protection</Text>
                  <ul style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '14px' }}>
                    <li>No personal data collection</li>
                    <li>All data stays on device</li>
                    <li>Anonymous AI requests only</li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Card>

          <Card title="✅ Parent Confirmation">
            <Space direction="vertical" size={16} style={{ width: '100%' }}>
              <Paragraph>
                Please confirm that you understand and agree to the following:
              </Paragraph>
              
              <div>
                <Checkbox 
                  checked={parentConfirmation}
                  onChange={(e) => setParentConfirmation(e.target.checked)}
                >
                  <Text>I am a parent or guardian and I'm in control of this device</Text>
                </Checkbox>
              </div>
              
              <div>
                <Checkbox 
                  checked={privacyAcknowledged}
                  onChange={(e) => setPrivacyAcknowledged(e.target.checked)}
                >
                  <Text>I have reviewed the privacy policy and understand that no personal data is collected</Text>
                </Checkbox>
              </div>
              
              <div>
                <Checkbox 
                  checked={safetyUnderstood}
                  onChange={(e) => setSafetyUnderstood(e.target.checked)}
                >
                  <Text>I understand the AI safety guidelines and will supervise my child's use</Text>
                </Checkbox>
              </div>
            </Space>
          </Card>

          <Divider />

          <Row justify="center" gutter={16}>
            <Col>
              <Button size="large" disabled>
                View Full Privacy Policy
              </Button>
            </Col>
            <Col>
              <Button 
                type="primary" 
                size="large" 
                icon={<CheckCircleOutlined />}
                onClick={handleContinue}
                disabled={!isAllConfirmed}
              >
                Continue to TaleWeaver
              </Button>
            </Col>
          </Row>

          {!isAllConfirmed && (
            <div style={{ textAlign: 'center' }}>
              <Text type="secondary" style={{ fontSize: '14px' }}>
                Please confirm all items above to continue
              </Text>
            </div>
          )}
        </Space>
      </div>
    </div>
  );
};

export default ParentNoticeScene;