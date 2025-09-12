// frontend/src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginApi, logout as logoutApi, getCurrentUser } from '../services/authApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // For demo, just set a user without checking token
      setUser({
        id: 1,
        name: 'Cafe Manager',
        email: 'demo@wingscafe.com',
        role: 'admin'
      });
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      // For demo purposes, just set user directly without API call
      setUser({
        id: 1,
        name: 'Cafe Manager',
        email: credentials.email || 'demo@wingscafe.com',
        role: 'admin'
      });
      
      localStorage.setItem('isLoggedIn', 'true');
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: 'Login failed' 
      };
    }
  };

  const logout = async () => {
    localStorage.removeItem('isLoggedIn');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};