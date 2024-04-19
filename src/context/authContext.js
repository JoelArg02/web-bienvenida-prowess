import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        validateToken(storedToken);
      } else {
        logout();
      }
    }, 1000 * 60 * 5);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "token") {
        if (event.newValue) {
          validateToken(event.newValue);
          setToken(event.newValue);
        } else {
          logout();
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      validateToken(storedToken);
      setToken(storedToken);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    validateToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setCurrentUser(null);
  };

  function validateToken(token) {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = new Date().getTime() / 1000;

        if (decoded.exp < currentTime) {
          logout();
          return;
        }

        // if (
        //   decoded.iss !== "ExampleIssuer" ||
        //   decoded.aud !== "ExampleAudience"
        // ) {
        //   console.log("Token issuer or audience is invalid.");
        //   logout();
        //   return;
        // }

        setCurrentUser(decoded);
      } catch (error) {
        logout();
      }
    } else {
      logout();
    }
  }

  const value = {
    currentUser,
    login,
    logout,
    setCurrentUser,
    validateToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
