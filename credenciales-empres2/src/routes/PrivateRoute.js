// src/routes/PrivateRoute.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
