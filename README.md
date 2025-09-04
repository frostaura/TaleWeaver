# TaleWeaver
**Magical, Personalized Bedtime Stories**

TaleWeaver is a mobile app that generates safe, personalized,  bedtime stories for children. Featuring a child-centric design with robust parental controls, TaleWeaver creates magical storytelling experiences tailored to each child's unique interests and imagination.

## Key Features

- 🎭 **Personalized Story Generation** - AI-powered stories tailored to your child's interests, favorite characters, and important people
- 🔒 **Safety First** - Advanced content filtering with customizable parental controls
- 🎵 **Voice Synthesis** - Professional voice narration with warm, friendly options
- ⭐ **Instant Magic** - Generate personalized stories in seconds
- 📚 **Infinite Stories** - Serialized narratives that continue across sessions (Premium+)

## Technical Stack

- **Mobile App:** HTML5 (ReactTS, Redux, ReactBits)
- **Backend:** .NET 8 (ASP.NET Core Web API)
- **Database:** PostgreSQL with Entity Framework Core
- **AI Integration:** OpenAI API for story generation
- **Voice:** ElevenLabs API for speech synthesis

## Frontend Development

The frontend is located in `src/frontend` and built with React TypeScript and Vite.

### Local Development
```bash
cd src/frontend
npm install
npm run dev
```

### Building
```bash
cd src/frontend
npm run build
```

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
