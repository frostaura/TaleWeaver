import './App.css';
import { ConfigProvider, theme } from 'antd';
import { Carousel } from './components/ReactBits';
import type { CarouselItem } from './components/ReactBits';
import { SettingsScene, QuickPlayScene, CustomStoryScene, ParentalLockScene } from './components/Scenes';

function App() {
  // Define the app scenes for the full-page carousel
  const appScenes: CarouselItem[] = [
    {
      title: "Settings",
      description: "Customize your TaleWeaver experience",
      icon: "⚙️",
      component: <SettingsScene />
    },
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
      title: "Parental Lock",
      description: "Secure your app with parental controls",
      icon: "🔒",
      component: <ParentalLockScene />
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
