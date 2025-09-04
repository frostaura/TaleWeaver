import { useState } from 'react'
import './App.css'

function App() {
  const [storyGenerated, setStoryGenerated] = useState(false)

  return (
    <>
      <div>
        <h1>✨ TaleWeaver</h1>
        <p className="tagline">Magical, Personalized Bedtime Stories</p>
      </div>
      
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
