import { useState } from 'react'
import './App.css'
import { Carousel } from './components/ReactBits'
import type { CarouselItem } from './components/ReactBits'

function App() {
  const [storyGenerated, setStoryGenerated] = useState(false)

  const carouselItems: CarouselItem[] = [
    {
      title: "AI-Powered Personalization",
      description: "Every story is uniquely crafted based on your child's interests, age, and preferences using advanced AI technology.",
      icon: "🎭"
    },
    {
      title: "Safety-First Approach",
      description: "Advanced content filtering ensures all stories are age-appropriate with comprehensive parental controls.",
      icon: "🔒"
    },
    {
      title: "Professional Voice Narration",
      description: "Choose from multiple high-quality voice synthesis options to bring stories to life.",
      icon: "🎵"
    },
    {
      title: "Instant Story Generation",
      description: "Create magical, personalized bedtime stories in seconds with just a few clicks.",
      icon: "⭐"
    },
    {
      title: "Educational Content",
      description: "Stories can incorporate learning elements, helping children discover new concepts while having fun.",
      icon: "📚"
    },
    {
      title: "Endless Variety",
      description: "Never run out of bedtime stories with our AI that creates infinite unique tales.",
      icon: "🌟"
    }
  ]

  return (
    <>
      <div>
        <h1>✨ TaleWeaver</h1>
        <p className="tagline">Magical, Personalized Bedtime Stories</p>
      </div>
      
      <Carousel items={carouselItems} autoRotateInterval={5000} />
      
      <div className="features">
        <div className="feature">
          <h3>🎭 Personalized Stories</h3>
          <p>AI-powered stories tailored to your child's interests</p>
        </div>
        <div className="feature">
          <h3>🔒 Safety First</h3>
          <p>Advanced content filtering with parental controls</p>
        </div>
        <div className="feature">
          <h3>🎵 Voice Synthesis</h3>
          <p>Professional voice narration options</p>
        </div>
        <div className="feature">
          <h3>⭐ Instant Magic</h3>
          <p>Generate personalized stories in seconds</p>
        </div>
      </div>

      <div className="card">
        <button onClick={() => setStoryGenerated(!storyGenerated)}>
          {storyGenerated ? 'Generate Another Story' : 'Generate Story'}
        </button>
        {storyGenerated && (
          <div className="story-preview">
            <h4>Story Preview</h4>
            <p>Once upon a time, in a magical land filled with wonder...</p>
            <p><em>This is a preview of the TaleWeaver story generation feature.</em></p>
          </div>
        )}
      </div>
      
      <p className="coming-soon">
        Full app coming soon! This is a preview of the TaleWeaver frontend.
      </p>
    </>
  )
}

export default App
