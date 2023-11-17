import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const login = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  const authContextValue = {
    isLoggedIn,
    username,
    login,
    logout,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
