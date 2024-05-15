import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import CredentialsPage from '../pages/CredentialsPage';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/credentials" element={<PrivateRoute />}>
        <Route path="/credentials" element={<CredentialsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
