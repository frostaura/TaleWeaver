import React, { useState, useEffect, useRef } from 'react';
import { 
  Button, 
  Typography, 
  Card, 
  Space, 
  Row, 
  Col, 
  Alert,
  Input,
  Progress
} from 'antd';
import { 
  UnlockOutlined, 
  CalculatorOutlined,
  AppstoreAddOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import './ParentalGate.css';

const { Title, Paragraph } = Typography;

type GateType = 'math' | 'sequence' | 'hold';

interface ParentalGateProps {
  onSuccess: () => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
}

const ParentalGate: React.FC<ParentalGateProps> = ({ 
  onSuccess, 
  onCancel, 
  title = "Parental Verification Required",
  description = "This action requires parent approval"
}) => {
  const [gateType, setGateType] = useState<GateType>('math');
  const [mathProblem, setMathProblem] = useState({ question: '', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [sequence, setSequence] = useState<string[]>([]);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [error, setError] = useState('');
  const holdIntervalRef = useRef<number | null>(null);

  // Generate random math problem
  const generateMathProblem = () => {
    const num1 = Math.floor(Math.random() * 10) + 5; // 5-14
    const num2 = Math.floor(Math.random() * 5) + 1; // 1-5
    const operations = ['+', '-'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let answer: number;
    let question: string;
    
    if (operation === '+') {
      answer = num1 + num2;
      question = `${num1} + ${num2}`;
    } else {
      // Ensure no negative results
      const larger = Math.max(num1, num2);
      const smaller = Math.min(num1, num2);
      answer = larger - smaller;
      question = `${larger} - ${smaller}`;
    }
    
    setMathProblem({ question, answer });
  };

  // Generate random shape sequence
  const generateSequence = () => {
    const shapes = ['🔵', '🔺', '🟢', '🟡', '🔶'];
    const sequenceLength = 3;
    const newSequence = [];
    
    for (let i = 0; i < sequenceLength; i++) {
      newSequence.push(shapes[Math.floor(Math.random() * shapes.length)]);
    }
    
    setSequence(newSequence);
    setUserSequence([]);
  };

  useEffect(() => {
    // Randomly select gate type
    const gates: GateType[] = ['math', 'sequence', 'hold'];
    const randomGate = gates[Math.floor(Math.random() * gates.length)];
    setGateType(randomGate);
    
    if (randomGate === 'math') {
      generateMathProblem();
    } else if (randomGate === 'sequence') {
      generateSequence();
    }
  }, []);

  const handleMathSubmit = () => {
    const answer = parseInt(userAnswer);
    if (answer === mathProblem.answer) {
      onSuccess();
    } else {
      setError('Incorrect answer. Please try again.');
      setUserAnswer('');
      // Generate new problem after wrong answer
      setTimeout(() => {
        generateMathProblem();
        setError('');
      }, 2000);
    }
  };

  const handleSequenceSelect = (shape: string) => {
    const newUserSequence = [...userSequence, shape];
    setUserSequence(newUserSequence);
    
    if (newUserSequence.length === sequence.length) {
      // Check if sequence matches
      const isCorrect = newUserSequence.every((shape, index) => shape === sequence[index]);
      
      if (isCorrect) {
        onSuccess();
      } else {
        setError('Incorrect sequence. Please try again.');
        setUserSequence([]);
        setTimeout(() => {
          generateSequence();
          setError('');
        }, 2000);
      }
    }
  };

  const handleHoldStart = () => {
    setIsHolding(true);
    setHoldProgress(0);
    
    const interval = setInterval(() => {
      setHoldProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsHolding(false);
          onSuccess();
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Store interval ID to clear it if user releases
    holdIntervalRef.current = interval;
  };

  const handleHoldEnd = () => {
    setIsHolding(false);
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    setHoldProgress(0);
  };

  const renderMathGate = () => (
    <Card title={<><CalculatorOutlined /> Solve This Math Problem</>}>
      <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
        <Title level={2} style={{ color: 'white', margin: 0 }}>
          {mathProblem.question} = ?
        </Title>
        
        <Input
          size="large"
          placeholder="Enter your answer"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onPressEnter={handleMathSubmit}
          style={{ width: '200px', textAlign: 'center', fontSize: '18px' }}
        />
        
        <Button 
          type="primary" 
          size="large" 
          onClick={handleMathSubmit}
          disabled={!userAnswer}
        >
          Submit Answer
        </Button>
        
        {error && <Alert message={error} type="error" showIcon />}
      </Space>
    </Card>
  );

  const renderSequenceGate = () => (
    <Card title={<><AppstoreAddOutlined /> Tap the Shapes in Order</>}>
      <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
        <div>
          <Paragraph style={{ color: 'white', fontSize: '16px', marginBottom: '16px' }}>
            Remember this sequence:
          </Paragraph>
          <div style={{ fontSize: '48px', letterSpacing: '8px', marginBottom: '24px' }}>
            {sequence.join(' ')}
          </div>
        </div>
        
        <div>
          <Paragraph style={{ color: 'white', fontSize: '16px', marginBottom: '16px' }}>
            Now tap them in the same order:
          </Paragraph>
          <div style={{ fontSize: '32px', letterSpacing: '4px', marginBottom: '24px', minHeight: '40px' }}>
            {userSequence.join(' ')}
            {userSequence.length < sequence.length && <span style={{ color: 'rgba(255,255,255,0.3)' }}>_</span>}
          </div>
        </div>
        
        <Row gutter={[16, 16]} justify="center">
          {['🔵', '🔺', '🟢', '🟡', '🔶'].map(shape => (
            <Col key={shape}>
              <Button
                size="large"
                onClick={() => handleSequenceSelect(shape)}
                disabled={userSequence.length >= sequence.length}
                style={{ 
                  width: '60px', 
                  height: '60px', 
                  fontSize: '24px',
                  padding: 0
                }}
              >
                {shape}
              </Button>
            </Col>
          ))}
        </Row>
        
        {error && <Alert message={error} type="error" showIcon />}
      </Space>
    </Card>
  );

  const renderHoldGate = () => (
    <Card title={<><ClockCircleOutlined /> Hold to Unlock</>}>
      <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
        <Paragraph style={{ color: 'white', fontSize: '16px' }}>
          Hold the button below for 3 seconds to continue
        </Paragraph>
        
        <div style={{ width: '200px', margin: '0 auto' }}>
          <Progress 
            percent={holdProgress} 
            strokeColor="#1890ff"
            trailColor="rgba(255,255,255,0.1)"
          />
        </div>
        
        <Button
          type="primary"
          size="large"
          icon={<UnlockOutlined />}
          onMouseDown={handleHoldStart}
          onMouseUp={handleHoldEnd}
          onMouseLeave={handleHoldEnd}
          onTouchStart={handleHoldStart}
          onTouchEnd={handleHoldEnd}
          style={{ 
            width: '200px', 
            height: '60px', 
            fontSize: '18px',
            backgroundColor: isHolding ? '#52c41a' : undefined
          }}
        >
          {isHolding ? 'Keep Holding...' : 'Hold to Unlock'}
        </Button>
        
        <Paragraph style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
          This prevents accidental taps by children
        </Paragraph>
      </Space>
    </Card>
  );

  return (
    <div className="parental-gate" style={{ padding: '20px', maxHeight: '100vh', overflowY: 'auto' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Title level={1} style={{ textAlign: 'center', color: 'white', marginBottom: '8px' }}>
          🔒 {title}
        </Title>
        <Paragraph style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.75)', fontSize: '16px', marginBottom: '32px' }}>
          {description}
        </Paragraph>

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Alert
            message="Parent Verification"
            description="This gate helps ensure only parents can access sensitive features"
            type="info"
            showIcon
          />

          {gateType === 'math' && renderMathGate()}
          {gateType === 'sequence' && renderSequenceGate()}
          {gateType === 'hold' && renderHoldGate()}

          {onCancel && (
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <Button size="large" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          )}
        </Space>
      </div>
    </div>
  );
};

export default ParentalGate;