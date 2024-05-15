import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './hooks/useAuth';
import Navigation from './components/Navigation/Navigation';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Container>
          <AppRoutes />
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
