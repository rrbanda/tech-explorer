#!/bin/bash

echo "🔧 Quick Fix for Dependency Issues"
echo "=================================="

# Clean everything
echo "🧹 Cleaning existing installations..."
rm -rf node_modules frontend/node_modules backend/node_modules
rm -rf frontend/package-lock.json backend/package-lock.json package-lock.json

# Install with legacy peer deps to resolve conflicts
echo "📦 Installing with legacy peer deps resolution..."
npm install --legacy-peer-deps

# Install frontend dependencies
echo "🎨 Installing frontend dependencies..."
cd frontend
npm install --legacy-peer-deps
cd ..

# Install backend dependencies
echo "⚙️ Installing backend dependencies..."
cd backend
npm install --legacy-peer-deps
cd ..

echo "✅ Dependencies installed successfully!"
echo ""
echo "🚀 Next steps:"
echo "   npm run dev    # Start development servers"
echo "   npm run build  # Build for production"
echo "   npm test       # Run tests"
