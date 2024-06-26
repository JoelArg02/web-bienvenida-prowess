import React, { useState, useEffect, useContext, createContext } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        localStorage.setItem('token', token); 
        const decodedToken = jwtDecode(token);
        setUser(currentUser);
        setUserDetails(decodedToken);
      } else {
        setUser(null);
        setUserDetails(null);
        localStorage.removeItem('token');
      }
    });

    return unsubscribe;
  }, []);

  const logout = () => {
    signOut(auth);
    localStorage.removeItem('token'); // Eliminar token de localStorage
  };

  return (
    <AuthContext.Provider value={{ user, userDetails, setUser, setUserDetails, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
