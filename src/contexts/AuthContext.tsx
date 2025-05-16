import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';

// Mock user data - in a real app, this would come from the API
const MOCK_USER: User = {
  id: '1',
  username: 'codemaster',
  email: 'codemaster@example.com',
  avatarUrl: 'https://i.pravatar.cc/150?u=codemaster',
  joinedAt: new Date().toISOString(),
  rating: 1500,
  wins: 27,
  losses: 12,
  totalDuels: 39
};

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    // Check if user is already logged in (e.g., from localStorage)
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('codebattle_user');
      
      if (storedUser) {
        try {
          // In a real app, we would validate the token with the server
          const user = JSON.parse(storedUser) as User;
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } catch (error) {
          localStorage.removeItem('codebattle_user');
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: 'Session expired. Please login again.'
          });
        }
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // In a real app, we would make an API call to authenticate
      // For now, we'll simulate a successful login with mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network request
      
      // Store user in localStorage
      localStorage.setItem('codebattle_user', JSON.stringify(MOCK_USER));
      
      setAuthState({
        user: MOCK_USER,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Invalid email or password'
      });
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // In a real app, we would make an API call to register
      // For now, we'll simulate a successful registration with mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network request
      
      const newUser: User = {
        ...MOCK_USER,
        username,
        email,
        rating: 1200,
        wins: 0,
        losses: 0,
        totalDuels: 0
      };
      
      // Store user in localStorage
      localStorage.setItem('codebattle_user', JSON.stringify(newUser));
      
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Registration failed. Please try again.'
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('codebattle_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};