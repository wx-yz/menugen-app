# MenuGen App - Asgardeo Authentication & Choreo Deployment Guide

## Overview
This guide covers the complete setup of MenuGen app with Asgardeo authentication and deployment to Choreo platform.

## 🔐 Asgardeo Authentication Setup

### 1. Install Asgardeo React SDK
The Asgardeo React SDK has been installed in the frontend:
```bash
cd frontend
npm install @asgardeo/auth-react
```

### 2. Configuration Files
- **Frontend Auth Config**: `frontend/src/auth-config.ts` - Asgardeo configuration
- **Environment Template**: `frontend/.env.example` - Environment variables template
- **TypeScript Types**: `frontend/src/vite-env.d.ts` - TypeScript definitions for env vars

### 3. Environment Variables Setup
Create a `.env` file in the frontend directory with:
```env
VITE_ASGARDEO_CLIENT_ID=your_client_id_here
VITE_ASGARDEO_BASE_URL=https://api.asgardeo.io/t/your_org_name
VITE_API_URL=http://localhost:5001
```

### 4. Asgardeo Console Setup
1. Log in to [Asgardeo Console](https://console.asgardeo.io/)
2. Create a new Single Page Application
3. Configure redirect URLs:
   - **Authorized Redirect URLs**: `http://localhost:3000`, `https://your-choreo-app-url.com`
   - **Allowed Origins**: `http://localhost:3000`, `https://your-choreo-app-url.com`
4. Copy the **Client ID** and **Organization** name to your `.env` file

## 🏗️ Choreo Deployment Configuration

### 1. Component YAML Files
Both frontend and backend have been configured with `.choreo/component.yaml` files:

#### Frontend Configuration
```yaml
# frontend/.choreo/component.yaml
schemaVersion: 1.0
componentName: menugen-frontend
componentDisplayName: MenuGen Frontend
componentDescription: Frontend application for MenuGen - AI-powered menu visualization
componentType: WebApplication
port: 8080
ingress:
  include: "**"
```

#### Backend Configuration
```yaml
# backend/.choreo/component.yaml
schemaVersion: 1.0
componentName: menugen-backend
componentDisplayName: MenuGen Backend API
componentDescription: Backend API for MenuGen - AI-powered menu visualization
componentType: Service
port: 5001
ingress:
  include: "**"
```

### 2. OpenAPI Specification
The backend includes an OpenAPI specification (`backend/openapi.yaml`) that defines the API endpoints.

## 🚀 Deployment Steps

### 1. GitHub Repository
✅ **Completed**: Repository created at `https://github.com/wx-yz/menugen-app`

### 2. Choreo Project Setup
✅ **Completed**: Project created in Choreo with ID: `38db8237-1906-49e8-922e-8085c6d6aa66`

### 3. GitHub App Authorization Required
**⚠️ Next Step**: Install the Choreo GitHub App by visiting:
```
https://github.com/apps/wso2-cloud-app/installations/new
```

### 4. Create Components in Choreo
After GitHub app authorization, create the components:

#### Backend Service Component:
- **Buildpack**: NodeJS (ID: `F9E4820E-6284-11EE-8C99-0242AC120004`)
- **Language Version**: `20.x.x`
- **Repository Directory**: `backend`
- **Port**: `5001`
- **OpenAPI Schema**: `openapi.yaml`

#### Frontend Web Application Component:
- **Buildpack**: React (ID: `F9E4820E-6284-11EE-8C99-0242AC120011`)
- **Repository Directory**: `frontend`
- **Port**: `8080`
- **Build Command**: `npm install && npm run build`
- **Output Directory**: `dist`

## 📋 Authentication Implementation Details

### App.tsx Changes
- Imported `useAuthContext` from `@asgardeo/auth-react`
- Replaced custom auth hook with Asgardeo authentication
- Updated authentication state management:
  - `state.isAuthenticated` for auth status
  - `state.isLoading` for loading state
  - `state.username` for user information
  - `signIn()` for login
  - `signOut()` for logout

### Main.tsx Changes
- Wrapped app with Asgardeo `AuthProvider`
- Imported auth configuration from `auth-config.ts`

## 🔧 Local Development

### Prerequisites
- Node.js 18.x or later
- npm or yarn
- OpenAI API key

### Installation
```bash
# Install all dependencies
npm run install:all

# Start development servers
npm run dev
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Backend Development
```bash
cd backend
npm run dev
```

## 🌐 Production Configuration

### Asgardeo Production Setup
1. Update redirect URLs in Asgardeo console with production URLs
2. Update environment variables with production values
3. Configure CORS settings in backend for production domains

### Environment Variables for Production
- **Frontend**: Update `VITE_API_URL` to production backend URL
- **Backend**: Configure production CORS origins and OpenAI API key

## 📚 Additional Resources

- [Asgardeo React SDK Documentation](https://wso2.com/asgardeo/docs/complete-guides/react/)
- [Choreo Component Configuration Guide](https://wso2.com/choreo/docs/develop-components/manage-component-source-configurations/)
- [GitHub Repository](https://github.com/wx-yz/menugen-app)

## 🎯 Next Steps

1. **Install Choreo GitHub App** (required before component creation)
2. **Create components in Choreo** using the configurations above
3. **Configure Asgardeo application** with production URLs
4. **Deploy and test** the complete application
5. **Set up CI/CD** for automated deployments

---

*This documentation provides a complete guide for setting up MenuGen with Asgardeo authentication and Choreo deployment.*
