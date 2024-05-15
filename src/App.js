import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './hooks/useAuth';
import Navigation from './components/navigation/Navigation';
import AppRoutes from './routes/AppRoutes';
import Footer from './components/footer/Footer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Container>
          <AppRoutes />
        </Container>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
