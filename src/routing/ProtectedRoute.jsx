// Libraries
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Contexts
import { AuthContext } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};
