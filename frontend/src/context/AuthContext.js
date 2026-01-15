import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = authService.getToken();
      if (token) {
        try {
          const response = await authService.getMe();
          setUser(response.data);
        } catch (error) {
          authService.logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    authService.setToken(response.data.token);
    authService.setUser(response.data.user);
    setUser(response.data.user);
    return response.data;
  };

  const signup = async (data) => {
    const response = await authService.signup(data);
    authService.setToken(response.data.token);
    authService.setUser(response.data.user);
    setUser(response.data.user);
    return response.data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};