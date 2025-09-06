#!/bin/bash

# Development setup script for TaleWeaver
echo "🎭 TaleWeaver Development Setup"
echo "==============================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command_exists docker; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command_exists docker-compose; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command_exists dotnet; then
    echo "❌ .NET SDK is not installed. Please install .NET 8 SDK first."
    exit 1
fi

echo "✅ All prerequisites are available"

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd src/frontend
npm install
cd ../..

# Setup Ollama model
echo ""
echo "🤖 Setting up Ollama LLM model..."
echo "This will start Ollama and download the llama3.2:1b model (~1.3GB)"
read -p "Continue? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker-compose up -d ollama
    echo "Waiting for Ollama to start..."
    sleep 10
    docker exec ollama ollama pull llama3.2:1b
    echo "✅ Model downloaded successfully"
else
    echo "⚠️ Skipping model download. You'll need to run 'docker exec ollama ollama pull llama3.2:1b' later."
fi

echo ""
echo "🚀 Development Setup Complete!"
echo ""
echo "Available commands:"
echo "  npm run dev          - Start frontend development server (src/frontend)"
echo "  dotnet run           - Start backend development server (src/backend)"
echo "  docker-compose up    - Start all services with Docker"
echo ""
echo "Useful URLs:"
echo "  Frontend:     http://localhost:5173 (dev) or http://localhost:3000 (docker)"
echo "  Backend API:  http://localhost:5001 (dev) or http://localhost:5000 (docker)"
echo "  API Docs:     http://localhost:5000/swagger (docker only)"
echo "  Ollama:       http://localhost:11434"
echo "  Parler-TTS:   http://localhost:5005"