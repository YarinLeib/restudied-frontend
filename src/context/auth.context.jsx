import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5005/api';

const AuthContext = createContext();

export function AuthProviderWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const storeToken = (token) => localStorage.setItem('authToken', token);

  const removeToken = () => localStorage.removeItem('authToken');

  const authenticateUser = () => {
    const storedToken = localStorage.getItem('authToken');
    axios
      .get(`${API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log('✅ User verified:', response.data);
        // ...
      })
      .catch((err) => {
        console.error('❌ Token verification failed:', err.response?.data);
      });
    if (storedToken) {
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          const user = response.data;
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {
          console.error('Auth error:', error.response?.data || error.message);
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const logout = () => {
    removeToken();
    authenticateUser();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, isLoading, storeToken, authenticateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
