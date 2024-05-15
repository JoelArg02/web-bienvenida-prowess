import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../../hooks/useAuth';

const Navigation = () => {
  const { user, userDetails, logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Credenciales Empresa</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          {user ? (
            <>
              <LinkContainer to="/credentials">
                <Nav.Link>Credenciales</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/credentials/list">
                <Nav.Link>Lista de Credenciales</Nav.Link>
              </LinkContainer>
              <Button variant="outline-light" onClick={logout} style={{ marginLeft: '10px' }}>
                Cerrar Sesión
              </Button>
              <Navbar.Text className="ml-auto">
                Conectado como: {userDetails?.email}
              </Navbar.Text>
            </>
          ) : (
            <LinkContainer to="/login">
              <Nav.Link>Iniciar Sesión</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
