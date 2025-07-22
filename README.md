# MenuGen - AI-Powered Menu Visualization

Transform any menu into stunning, mouth-watering visuals using AI.

## Features

- 📸 Take photos with built-in camera
- 📱 Upload from photo library
- 📁 Choose files from browser
- 🤖 AI-powered dish visualization using OpenAI
- 🔐 Authentication with Asgardeo
- 📱 Responsive design

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key
- Asgardeo application setup

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install:all
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend folders
   - Fill in your OpenAI API key and Asgardeo configuration

### Development

Run both frontend and backend in development mode:
```bash
npm run dev
```

Or run them separately:
```bash
# Frontend (runs on http://localhost:3000)
npm run dev:frontend

# Backend (runs on http://localhost:5000)
npm run dev:backend
```

## Project Structure

```
menugen-app/
├── frontend/          # React SPA with Vite
├── backend/           # Node.js/Express API
├── package.json       # Root package.json for workspace management
└── README.md          # This file
```

## Technology Stack

### Frontend
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Asgardeo Auth SPA SDK

### Backend
- Node.js
- Express
- TypeScript
- Multer (file uploads)
- OpenAI API
- CORS

## License

MIT
