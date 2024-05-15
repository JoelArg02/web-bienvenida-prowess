import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import CredentialsPage from '../pages/CredentialsPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import HomePage from '../pages/Home';
import CredentialsListPage from '../pages/CredentialsListPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute />}>
        <Route path="" element={<AuthPage />} />
      </Route>
      <Route path="/" element={<PublicRoute />}>
        <Route path="" element={<HomePage />} />
      </Route>
      <Route path="/credentials" element={<PrivateRoute />}>
        <Route path="" element={<CredentialsPage />} />
        <Route path="list" element={<CredentialsListPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;