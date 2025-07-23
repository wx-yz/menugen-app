import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface User {
  id: string;
  username: string;
  email?: string;
  name?: string;
  org_name?: string;
  [key: string]: any; // Allow additional properties from Choreo
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
  checkAuth: () => void;
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

  const checkAuth = () => {
    try {
      if (Cookies.get('userinfo')) {
        // We are here after a login
        const userInfoCookie = Cookies.get('userinfo');
        if (userInfoCookie) {
          sessionStorage.setItem("userInfo", userInfoCookie);
          Cookies.remove('userinfo');
          const userInfo = JSON.parse(atob(userInfoCookie));
          setState({
            isAuthenticated: true,
            isLoading: false,
            user: userInfo,
            error: null,
          });
        }
      } else if (sessionStorage.getItem("userInfo")) {
        // We have already logged in
        const userInfoString = sessionStorage.getItem("userInfo");
        if (userInfoString) {
          const userInfo = JSON.parse(atob(userInfoString));
          setState({
            isAuthenticated: true,
            isLoading: false,
            user: userInfo,
            error: null,
          });
        }
      } else {
        console.log("User is not signed in");
        setState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          error: null,
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: error instanceof Error ? error.message : 'Authentication check failed',
      });
    }
  };

  const signIn = () => {
    // For Choreo managed auth, redirect to the login endpoint
    window.location.href = '/auth/login';
  };

  const signOut = () => {
    try {
      sessionStorage.removeItem("userInfo");
      const sessionHint = Cookies.get('session_hint');
      window.location.href = `/auth/logout${sessionHint ? `?session_hint=${sessionHint}` : ''}`;
    } catch (error) {
      console.error('Logout failed:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Logout failed',
      }));
    }
  };

  // Handle authentication errors from URL parameters
  useEffect(() => {
    const errorCode = new URLSearchParams(window.location.search).get('code');
    const errorMessage = new URLSearchParams(window.location.search).get('message');
    if (errorCode) {
      setState(prev => ({
        ...prev,
        error: `Error Code: ${errorCode}. Error Description: ${errorMessage}`,
      }));
    }
  }, []);

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
