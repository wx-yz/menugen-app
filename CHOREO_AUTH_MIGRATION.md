# MenuGen App - Choreo Managed Authentication Guide

## Overview
This guide covers the complete refactoring from Asgardeo authentication to Choreo's in-built managed authentication system.

## 🔄 Changes Made

### 1. **Removed Asgardeo Dependencies**
- ✅ Uninstalled `@asgardeo/auth-react` package
- ✅ Removed `auth-config.ts` file
- ✅ Updated environment variables to remove Asgardeo-specific configs

### 2. **Implemented Choreo Managed Authentication**
- ✅ Created custom `useAuth` hook at `frontend/src/hooks/useAuth.tsx`
- ✅ Updated component.yaml files for both frontend and backend
- ✅ Added authentication middleware to backend API
- ✅ Implemented session-based authentication flow

### 3. **Component Configuration Updates**

#### Frontend (.choreo/component.yaml)
```yaml
schemaVersion: 1.2
endpoints:
  - name: menugen-frontend-app
    displayName: MenuGen Frontend App
    service:
      basePath: /
      port: 8080
    type: REST
    networkVisibilities: 
      - Public
      - Organization
    auth:
      required: true
      authType: OAuth2
```

#### Backend (.choreo/component.yaml)
```yaml
schemaVersion: 1.2
endpoints:
  - name: menugen-backend-api
    displayName: MenuGen Backend API
    service:
      basePath: /
      port: 5001
    type: REST
    networkVisibilities: 
      - Public
      - Organization
    auth:
      required: true
      authType: OAuth2
```

## 🔐 Authentication Flow

### 1. **Frontend Authentication**
- Uses session-based authentication via cookies
- Checks authentication status via `/api/auth/user` endpoint
- Handles login redirects to `/auth/login`
- Handles logout via `/auth/logout`

### 2. **Backend Authentication**
- Extracts user information from Choreo headers:
  - `x-user-id`: User ID
  - `x-user-email`: User email
  - `x-user-name`: User display name
  - `x-username`: Username
- Provides `/api/auth/user` endpoint for user info
- Protects API endpoints with authentication middleware

### 3. **Development Mode Support**
- Frontend: Simulates authenticated user in development
- Backend: Creates mock user when Choreo headers are not present

## 📁 Key Files Modified

### Frontend Changes
```
frontend/
├── src/
│   ├── hooks/
│   │   └── useAuth.tsx          # New: Choreo managed auth hook
│   ├── App.tsx                  # Updated: Use new auth hook
│   ├── main.tsx                 # Updated: Use AuthProvider
│   └── vite-env.d.ts           # Updated: Removed Asgardeo types
├── .choreo/
│   └── component.yaml           # Updated: Added auth configuration
└── .env.example                 # Updated: Removed Asgardeo vars
```

### Backend Changes
```
backend/
├── src/
│   └── server.ts                # Updated: Added auth middleware & endpoints
├── .choreo/
│   └── component.yaml           # Updated: Added auth configuration
└── openapi.yaml                 # Same: API specification
```

## 🚀 Deployment with Choreo Managed Auth

### 1. **Deploy Components**
Deploy both frontend and backend components to Choreo with the updated configurations.

### 2. **Authentication Configuration**
Choreo will automatically:
- Handle OAuth2 authentication
- Provide user session management
- Inject user information via headers
- Manage login/logout flows

### 3. **No Additional Setup Required**
Unlike Asgardeo, Choreo managed authentication requires:
- ❌ No external identity provider setup
- ❌ No client ID configuration
- ❌ No redirect URL management
- ✅ Just enable auth in component.yaml

## 🛠️ Development vs Production

### Development Mode
- Frontend: Simulates authenticated user for local development
- Backend: Creates mock user when Choreo headers absent
- Run locally: `npm run dev` works without authentication setup

### Production Mode (Choreo)
- Frontend: Uses actual Choreo authentication
- Backend: Receives real user information via headers
- Automatic OAuth2 flow managed by Choreo platform

## 🔧 API Changes

### New Endpoints
- `GET /api/auth/user` - Returns current user information
- All existing endpoints now require authentication

### Request Format
All API requests from frontend now include:
```javascript
fetch('/api/endpoint', {
  method: 'POST',
  credentials: 'include', // Essential for session cookies
  body: formData,
});
```

## 📋 Migration Summary

| Aspect | Before (Asgardeo) | After (Choreo Managed) |
|--------|-------------------|------------------------|
| **SDK** | `@asgardeo/auth-react` | Custom React hook |
| **Config** | Client ID, Base URL, Redirects | component.yaml only |
| **Authentication** | JWT tokens | Session cookies |
| **User Info** | From Asgardeo API | From Choreo headers |
| **Setup Complexity** | High (external setup) | Low (platform managed) |
| **Development** | Requires Asgardeo setup | Works with mock data |

## ✅ Benefits of Choreo Managed Auth

1. **Simplified Setup**: No external identity provider configuration
2. **Platform Integration**: Seamless integration with Choreo ecosystem
3. **Automatic Management**: Session handling managed by platform
4. **Development Friendly**: Works locally with mock data
5. **Security**: OAuth2 flow managed by Choreo infrastructure
6. **Scalability**: Built for cloud-native applications

## 🎯 Next Steps

1. **Deploy Updated Components**: Use the new component.yaml configurations
2. **Test Authentication Flow**: Verify login/logout works in Choreo
3. **Monitor User Sessions**: Use Choreo console to monitor authentication
4. **Optional**: Customize authentication UI if needed

The application is now fully configured for Choreo managed authentication! 🚀
