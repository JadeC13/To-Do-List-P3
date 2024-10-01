// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // Using axios for consistent API calls


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    loading: true,
    user: null, 
  });

  // Fetch user data from the server using the JWT token
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/authentication`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          // Set user data, authentication status, and stop loading
          setAuthState({
            isAuthenticated: true,
            loading: false,
            user: { ...response.data, token },
          });
        } else {
          // If token is invalid, clear auth state and token
          setAuthState({ isAuthenticated: false, loading: false, user: null });
          localStorage.removeItem('token');
        }
      } else {
        // No token in localStorage setting
        setAuthState({ isAuthenticated: false, loading: false, user: null });
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setAuthState({ isAuthenticated: false, loading: false, user: null });
    }
  };


  useEffect(() => {

    fetchUser(); 
  }, []);



  return (
    <AuthContext.Provider
    value={{
      authState,
      setAuthState,
    }}
  >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
