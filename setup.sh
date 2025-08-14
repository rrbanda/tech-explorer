#!/bin/bash

echo "�� Setting up Tech Explorer - Full Stack Application"
echo "================================================================"

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo "✅ npm $(npm -v) detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm run install:all

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create log directories
echo ""
echo "📁 Creating directories..."
mkdir -p backend/logs
mkdir -p frontend/dist
mkdir -p backend/dist

# Copy environment files
echo ""
echo "🔧 Setting up environment files..."
if [ ! -f "backend/.env" ]; then
    cp backend/.env.development backend/.env
    echo "✅ Created backend/.env from .env.development"
fi

if [ ! -f "frontend/.env" ]; then
    cp frontend/.env.development frontend/.env
    echo "✅ Created frontend/.env from .env.development"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "🚀 Quick Start Commands:"
echo "   npm run dev          # Start both frontend and backend"
echo "   npm run frontend:dev # Start only frontend (port 3000)"
echo "   npm run backend:dev  # Start only backend (port 3001)"
echo "   npm run build        # Build for production"
echo "   npm test             # Run tests"
echo ""
echo "🌐 URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:3001"
echo ""
echo "📝 Next steps:"
echo "   1. Update API keys in backend/.env"
echo "   2. Run 'npm run dev' to start development"
echo "   3. Open http://localhost:3000 in your browser"
echo ""
echo "🔗 For production deployment, see docker-compose.yml"
