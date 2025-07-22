# MenuGen - AI-Powered Menu Visualization Application

## Overview

MenuGen is a comprehensive single-page application that transforms restaurant menus into stunning visual presentations using AI. Users can upload menu photos, and the app generates mouth-watering dish images using OpenAI's DALL-E API.

## 🏗️ Architecture

### Monorepo Structure
```
menugen-app/
├── frontend/          # React SPA with TypeScript
├── backend/           # Node.js/Express API
├── package.json       # Root workspace configuration
├── README.md          # Main documentation
└── ASGARDEO_SETUP.md  # Authentication setup guide
```

## 🚀 Features

### Frontend Features
- **Modern React SPA**: Built with React 18, TypeScript, and Vite
- **Authentication**: Integrated with Asgardeo SPA SDK for secure login
- **Multiple Upload Options**: 
  - 📸 Camera capture
  - 📱 Photo library access  
  - 📁 File browser upload
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Settings Management**: User can securely add OpenAI API key
- **Loading States**: Proper loading indicators and error handling

### Backend Features
- **RESTful API**: Express.js with TypeScript
- **File Upload**: Multer middleware for handling image uploads (up to 10MB)
- **AI Integration**: OpenAI GPT-4 Vision for menu analysis and DALL-E 3 for image generation
- **Security**: CORS, Helmet, input validation
- **Error Handling**: Comprehensive error handling and logging

### AI Capabilities
- **Menu Analysis**: GPT-4 Vision analyzes uploaded menu images
- **Dish Identification**: Extracts food items with names and descriptions
- **Image Generation**: DALL-E 3 creates stunning food photography for each dish
- **Smart Prompting**: Optimized prompts for appetizing food visuals

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Asgardeo Auth SPA SDK** - Authentication

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Multer** - File upload handling
- **OpenAI API** - AI/ML services
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 📱 User Experience

### Authentication Flow
1. User lands on login page
2. Can authenticate via Asgardeo (social login supported)
3. Fallback to mock authentication for development

### Menu Processing Flow
1. User uploads menu image (camera/library/file)
2. Image sent to backend with OpenAI key
3. GPT-4 Vision analyzes menu and extracts dishes
4. DALL-E 3 generates images for each dish
5. Results displayed in responsive grid layout

### UI/UX Highlights
- **Clean Design**: Minimalist interface focused on functionality
- **Progressive Enhancement**: Works without JavaScript for basic functionality
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Mobile Responsive**: Single column on mobile, grid on desktop
- **Visual Feedback**: Loading states, error messages, success indicators

## 🔧 Configuration

### Environment Variables

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000
VITE_ASGARDEO_CLIENT_ID=your_client_id
VITE_ASGARDEO_BASE_URL=https://api.asgardeo.io/t/your_org
VITE_ASGARDEO_REDIRECT_URL=http://localhost:3000
```

**Backend (.env)**
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Configuration Files
- **Frontend**: `src/config.js` - Centralized configuration
- **Asgardeo**: Automatic fallback to mock auth if not configured
- **API**: Configurable base URL for different environments

## 🚦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- OpenAI API key
- Asgardeo account (optional - has mock auth fallback)

### Installation & Development
```bash
# Install all dependencies
npm run install:all

# Start both frontend and backend
npm run dev

# Or start separately
npm run dev:frontend  # http://localhost:3000
npm run dev:backend   # http://localhost:5000
```

### Building for Production
```bash
# Build both applications
npm run build

# Build separately
npm run build:frontend
npm run build:backend
```

## 🔐 Security Features

### Authentication
- **Asgardeo Integration**: Enterprise-grade identity management
- **PKCE Flow**: Secure OAuth2 implementation
- **Session Management**: Proper token handling and refresh
- **Social Login**: Support for Google, Facebook, etc.

### API Security
- **CORS Configuration**: Proper cross-origin settings
- **Helmet**: Security headers
- **Input Validation**: File type and size validation
- **Rate Limiting**: Protection against abuse
- **Environment Variables**: Sensitive data protection

## 📊 Performance Optimizations

### Frontend
- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Proper image handling
- **Bundle Optimization**: Vite's efficient bundling
- **Caching**: Browser caching strategies

### Backend
- **Memory Storage**: Efficient file handling with Multer
- **Streaming**: Large file support
- **Error Recovery**: Graceful error handling
- **Logging**: Comprehensive request/error logging

## 🔮 Future Enhancements

### Planned Features
- **Image Enhancement**: Pre-processing uploaded images
- **Menu Categories**: Automatic categorization of dishes
- **Nutritional Info**: Integration with nutrition APIs
- **Social Sharing**: Share generated menus
- **Multi-language**: Support for international menus
- **Analytics**: Usage analytics and insights

### Technical Improvements
- **Caching**: Redis for API response caching
- **CDN**: Image delivery optimization
- **Database**: Persistent storage for user preferences
- **Microservices**: Split into smaller services
- **Docker**: Containerization for deployment
- **CI/CD**: Automated testing and deployment

## 📝 API Documentation

### Endpoints

**POST /api/process-menu**
- **Purpose**: Process uploaded menu image
- **Input**: FormData with image file and OpenAI key
- **Output**: JSON with dish names, descriptions, and generated images
- **Auth**: Required (user must be authenticated)

**GET /health**
- **Purpose**: Health check endpoint
- **Output**: Server status and timestamp

### Error Handling
- **400**: Bad request (missing file/key)
- **401**: Unauthorized (authentication required)
- **413**: File too large (>10MB)
- **415**: Unsupported media type
- **500**: Internal server error

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request

### Code Standards
- **TypeScript**: Strict type checking
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Git Hooks**: Pre-commit validation

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

- **Documentation**: See README and setup guides
- **Issues**: GitHub Issues for bug reports
- **Community**: Discord for discussions
- **Asgardeo**: Official Asgardeo documentation and support

---

Built with ❤️ using modern web technologies and AI.
