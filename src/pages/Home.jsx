import React from 'react';
import { Container } from 'react-bootstrap';

const Home = () => {
  return (
    <Container style={{ marginTop: '50px' }}>
      <h1>Bienvenido a la Gestión de Credenciales</h1>
      <p>Por favor, inicie sesión para acceder a sus credenciales y variables de entorno.</p>
    </Container>
  );
};

export default Home;
