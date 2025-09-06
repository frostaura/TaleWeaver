import './App.css';
import { ConfigProvider, theme } from 'antd';
import { Carousel } from './components/ReactBits';
import type { CarouselItem } from './components/ReactBits';
import { 
  SettingsScene, 
  QuickPlayScene, 
  CustomStoryScene, 
  ParentalLockScene,
  PrivacyPolicyScene,
  ParentNoticeScene,
  UpgradeScene
} from './components/Scenes';
import { useState, useEffect } from 'react';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if onboarding has been completed
    const onboardingComplete = localStorage.getItem('taleweaver-onboarding-complete');
    if (!onboardingComplete) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  // If onboarding is needed, show parent notice first
  if (showOnboarding) {
    return (
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: '#646cff',
            colorBgContainer: 'rgba(255, 255, 255, 0.1)',
            colorBgElevated: 'rgba(255, 255, 255, 0.15)',
            colorText: 'rgba(255, 255, 255, 0.95)',
            colorTextSecondary: 'rgba(255, 255, 255, 0.75)',
            borderRadius: 12,
          },
        }}
      >
        <div className="app">
          <ParentNoticeScene onComplete={handleOnboardingComplete} />
        </div>
      </ConfigProvider>
    );
  }

  // Define the app scenes for the full-page carousel
  const appScenes: CarouselItem[] = [
    {
      title: "Quick Play",
      description: "Instantly generate magical bedtime stories",
      icon: "⚡",
      component: <QuickPlayScene />
    },
    {
      title: "Custom Story",
      description: "Create personalized stories with detailed customization",
      icon: "🎨",
      component: <CustomStoryScene />
    },
    {
      title: "Settings",
      description: "Customize your TaleWeaver experience",
      icon: "⚙️",
      component: <SettingsScene />
    },
    {
      title: "Upgrade",
      description: "Unlock unlimited stories and premium features",
      icon: "👑",
      component: <UpgradeScene />
    },
    {
      title: "Parental Lock",
      description: "Secure your app with parental controls",
      icon: "🔒",
      component: <ParentalLockScene />
    },
    {
      title: "Privacy Policy",
      description: "Learn about our privacy and safety practices",
      icon: "🛡️",
      component: <PrivacyPolicyScene />
    }
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#646cff',
          colorBgContainer: 'rgba(255, 255, 255, 0.1)',
          colorBgElevated: 'rgba(255, 255, 255, 0.15)',
          colorText: 'rgba(255, 255, 255, 0.95)',
          colorTextSecondary: 'rgba(255, 255, 255, 0.75)',
          borderRadius: 12,
        },
      }}
    >
      <div className="app">
        <Carousel 
          items={appScenes} 
          autoRotateInterval={0} // Disable auto-rotation for scenes
          isFullPage={true}
        />
      </div>
    </ConfigProvider>
  );
}

export default App;
