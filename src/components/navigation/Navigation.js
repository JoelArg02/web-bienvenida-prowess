import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../../hooks/useAuth';

const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Credenciales Prowess</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link>Inicio</Nav.Link>
          </LinkContainer>
          {user && (
            <>
              <LinkContainer to="/credentials">
                <Nav.Link>Credenciales</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/credentials/list">
                <Nav.Link>Env</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/users">
                <Nav.Link>Usuarios</Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
        <Nav className="ms-auto">
          {user ? (
            <Button variant="outline-light" onClick={logout} style={{ marginLeft: '10px' }}>
              Cerrar Sesión
            </Button>
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
