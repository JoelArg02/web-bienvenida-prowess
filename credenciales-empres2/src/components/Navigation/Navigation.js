import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../../hooks/useAuth';

const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Credenciales Empresa</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {user ? (
            <>
              <LinkContainer to="/credentials">
                <Nav.Link>Credentials</Nav.Link>
              </LinkContainer>
              <Button variant="outline-light" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <LinkContainer to="/">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;