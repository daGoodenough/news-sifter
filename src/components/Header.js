import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Header = () => (
  <Navbar className="color-nav" expand="lg" variant="light">
    <Container>
      <Navbar.Brand href="/">
        <img
          alt=""
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        News-Sifter
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto" alignRight>
          <Link to="/save">
            <Nav.Link>
              <strong>Saved</strong>
            </Nav.Link>
          </Link>
          <Link to="/history">
            {/* <Nav.Link>History</Nav.Link> */}
            HISTORY
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
export default Header;
