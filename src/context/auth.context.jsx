import { createContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export function AuthProviderWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const storeToken = (token) => localStorage.setItem("authToken", token);

  const removeToken = () => localStorage.removeItem("authToken");

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (!storedToken) {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
      return;
    }

    axios
      .get(`${API_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error(
          "Token verification failed:",
          error.response?.data || error.message
        );
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
      });
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const logout = () => {
    removeToken();
    authenticateUser();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        isLoading,
        storeToken,
        authenticateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
