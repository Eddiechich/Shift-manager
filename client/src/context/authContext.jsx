import React from 'react';
import { useState, useEffect, createContext } from "react";
import { login, logout, signup,loadUserDataFromToken } from '../services/userService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeUser = async () => {
      const { userData, isAuthenticated } = await loadUserDataFromToken();
      setUserData(userData);
      setIsAuthenticated(isAuthenticated);
    };
    initializeUser();
  }, []);

  const handleSignIn = async (email, password) => {
    try {
      const data = await login(email, password);
      setUserData(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log('handleSignIn error:', error);
      // TODO: Handle errors (display error message to the user)
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setUserData(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log('handleSignOut error:', error);
      // TODO: Handle errors (display error message to the user)
    }
  };

  const handleSignUp = async (name, email, password) => {
    try {
      const data = await signup(name, email, password);
      setUserData(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log('handleSignUp error:', error);
      // TODO: Handle errors (display error message to the user)
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        isAuthenticated,
        signIn: handleSignIn,
        signOut: handleSignOut,
        signUp: handleSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};