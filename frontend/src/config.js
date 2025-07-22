// Configuration for the MenuGen app
export const config = {
  // Backend API URL
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  
  // Asgardeo configuration
  asgardeo: {
    signInRedirectURL: import.meta.env.VITE_ASGARDEO_REDIRECT_URL || 'http://localhost:3000',
    signOutRedirectURL: import.meta.env.VITE_ASGARDEO_REDIRECT_URL || 'http://localhost:3000',
    clientID: import.meta.env.VITE_ASGARDEO_CLIENT_ID || 'BQzm8sLkDE3AEsitlFeXzmqVfhMa',
    baseUrl: import.meta.env.VITE_ASGARDEO_BASE_URL || 'https://api.asgardeo.io/t/chintanawilamuna',
    scope: ['openid', 'profile', 'email'],
    resourceServerURLs: [import.meta.env.VITE_API_URL || 'http://localhost:5000'],
    enablePKCE: true,
    storage: 'sessionStorage'
  },
  
  // File upload constraints
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
};
