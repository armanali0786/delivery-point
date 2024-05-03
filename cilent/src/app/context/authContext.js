import React, { useEffect, createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn , token}}>
      {children}
    </AuthContext.Provider>
  );
};
