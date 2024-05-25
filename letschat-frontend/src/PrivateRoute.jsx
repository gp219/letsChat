import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '../src/services/AuthService';

const PrivateRoute = () => {
  const isLoggedIn = AuthService.isLoggedIn();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />; // Redirect to Login if not logged in
  }

  return <Outlet />; // Render the protected component
};

export default PrivateRoute;
