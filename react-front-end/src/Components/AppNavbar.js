// Navbar.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; // For linking with React Router
import Container from 'react-bootstrap/Container';

const AppNavbar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" fixed='top'>
    <Container>
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/about">About</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  );
};

export default AppNavbar;