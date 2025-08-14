# Tech Explorer

Interactive Technology Catalog & Discovery Tool built with React + Node.js + TypeScript

## 🚀 Quick Start

```bash
# 1. Clone and setup
git clone <repository-url>
cd cx-tech-explorer
./setup.sh

# 2. Start development
npm run dev

# 3. Open browser
open http://localhost:3000
```

## 🏗️ Architecture

```
cx-tech-explorer/
├── frontend/          # React + TypeScript + Tailwind CSS
├── backend/           # Node.js + Express + TypeScript
├── docker-compose.yml # Docker containers
├── .github/workflows/ # CI/CD pipelines
└── package.json       # Workspace configuration
```

## 🛠️ Development

```bash
# Install all dependencies
npm run install:all

# Start development servers
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## 🐳 Docker Deployment

```bash
# Development
docker-compose up

# Production
docker-compose -f docker-compose.prod.yml up
```

## 🔧 Environment Variables

### Frontend (.env)
- `VITE_API_BASE_URL` - Backend API URL
- `VITE_APP_NAME` - Application name
- `VITE_ENVIRONMENT` - Environment (development/production)

### Backend (.env)
- `NODE_ENV` - Environment mode
- `PORT` - Server port
- `OPENAI_API_KEY` - OpenAI API key
- `ANTHROPIC_API_KEY` - Anthropic API key

## 📚 Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Query** - Data fetching
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Winston** - Logging
- **OpenAI/Anthropic** - AI services

## 🚀 Deployment

The application is configured for deployment on:
- **Vercel/Netlify** (Frontend)
- **Railway/Heroku** (Backend)
- **Docker** (Full stack)
- **AWS/GCP/Azure** (Enterprise)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details
