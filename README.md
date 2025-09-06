# TaleWeaver
**Magical, Personalized Bedtime Stories**

TaleWeaver is a mobile app that generates safe, personalized, bedtime stories for children. Featuring a child-centric design with robust parental controls, TaleWeaver creates magical storytelling experiences tailored to each child's unique interests and imagination.

## Key Features

- 🎭 **Personalized Story Generation** - AI-powered stories tailored to your child's interests, favorite characters, and important people
- 🔒 **Safety First** - Advanced content filtering with customizable parental controls
- 🎵 **Voice Synthesis** - Professional voice narration with warm, friendly options
- ⭐ **Instant Magic** - Generate personalized stories in seconds
- 📚 **Infinite Stories** - Serialized narratives that continue across sessions (Premium+)

## Technical Stack

- **Frontend:** React TypeScript with Antd UI components
- **Backend:** .NET 8 ASP.NET Core Web API
- **LLM:** Ollama (llama3.2:1b model for CPU-optimized performance)
- **TTS:** Parler-TTS (CPU-only text-to-speech)
- **Containerization:** Docker Compose with all services

## Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed
- At least 4GB RAM available for the AI models
- Internet connection for initial model downloads

### Running the Complete Stack

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd TaleWeaver
   ```

2. **Start all services:**
   ```bash
   docker-compose up -d
   ```

   This will start:
   - Ollama LLM service on port 11434
   - Parler-TTS service on port 5005
   - TaleWeaver backend API on port 5000
   - TaleWeaver frontend on port 3000

3. **First-time setup (wait for models to download):**
   ```bash
   # Wait for Ollama to be ready, then pull the model
   docker exec ollama ollama pull llama3.2:1b
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - API Documentation: http://localhost:5000/swagger

### Service Health Checks

```bash
# Check all services
docker-compose ps

# Check API health
curl http://localhost:5000/api/story/health

# Check Ollama
curl http://localhost:11434/api/tags
```

## Development

### Frontend Development
```bash
cd src/frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

### Backend Development
```bash
cd src/backend
dotnet restore
dotnet run   # Runs on http://localhost:5001 in dev mode
```

## API Endpoints

The backend provides three main story generation endpoints:

### Generate Story
```http
POST /api/story/generate
Content-Type: application/json

{
  "parentalSettings": {
    "childAge": 5,
    "allowedThemes": ["adventure", "friendship"],
    "allowMagic": true,
    "voiceType": "friendly",
    "maxStoryLength": 5
  },
  "theme": "magical adventure",
  "characterName": "Luna"
}
```

### Continue Story  
```http
POST /api/story/continue
Content-Type: application/json

{
  "parentalSettings": { /* same as above */ },
  "existingStory": "Once upon a time...",
  "direction": "make it more exciting"
}
```

### Custom Story
```http
POST /api/story/custom
Content-Type: application/json

{
  "parentalSettings": { /* same as above */ },
  "mainCharacter": "A brave little mouse",
  "setting": "enchanted library",
  "plot": "searching for a magic book"
}
```

## Safety Features

- **Content Filtering:** All stories are analyzed by the LLM for age-appropriateness
- **Parental Controls:** Configurable settings for themes, content types, and restricted words
- **Stateless Design:** No data stored on backend - all settings passed with each request
- **Child Safety Guards:** Automatic content classification before story delivery

## Model Configuration

The system uses lightweight, CPU-optimized models for cost-effective deployment:

- **LLM:** llama3.2:1b (1 billion parameter model, ~1.3GB)
- **TTS:** parler-tts-mini (lightweight text-to-speech model)

## GitHub Pages Deployment

The frontend is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Configuration

1. **Repository Settings**: Go to Settings > Pages in your GitHub repository
2. **Source**: Set to "GitHub Actions" 
3. **Workflow**: The deployment is handled by `.github/workflows/deploy-frontend.yml`

The deployment workflow:
- Builds the React TypeScript frontend using Vite
- Deploys the static files to GitHub Pages
- Runs on every push to main branch
- The site will be available at `https://<username>.github.io/TaleWeaver/`

### Manual Deployment

If needed, you can manually trigger the deployment by pushing to the main branch or running the workflow from the GitHub Actions tab.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
