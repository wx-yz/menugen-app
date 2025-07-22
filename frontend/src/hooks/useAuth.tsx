import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email?: string;
  name?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

interface AuthContextType extends AuthState {
  signIn: () => void;
  signOut: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: null,
  });

  const checkAuth = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Check if user is authenticated by making a request to a protected endpoint
      const response = await fetch('/api/auth/user', {
        credentials: 'include', // Important for Choreo managed auth
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setState({
          isAuthenticated: true,
          isLoading: false,
          user: userData,
          error: null,
        });
      } else if (response.status === 401) {
        setState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          error: null,
        });
      } else {
        throw new Error('Failed to check authentication status');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      
      // In development mode, allow the app to work without authentication
      if (import.meta.env.DEV) {
        console.warn('Development mode: Simulating authenticated user');
        setState({
          isAuthenticated: true,
          isLoading: false,
          user: {
            id: 'dev-user-123',
            username: 'developer',
            email: 'developer@example.com',
            name: 'Developer User',
          },
          error: null,
        });
      } else {
        setState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          error: error instanceof Error ? error.message : 'Authentication check failed',
        });
      }
    }
  };

  const signIn = () => {
    // For Choreo managed auth, redirect to the login endpoint
    window.location.href = '/auth/login';
  };

  const signOut = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Call the logout endpoint
      const response = await fetch('/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          error: null,
        });
        // Redirect to home page after logout
        window.location.href = '/';
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Logout failed',
      }));
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const contextValue: AuthContextType = {
    ...state,
    signIn,
    signOut,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
