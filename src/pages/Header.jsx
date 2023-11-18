// Libraries
import { Link } from 'react-router-dom';
import { useContext } from 'react';

// Config

// Contexts

// Components

// Styling
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';
import { AuthContext } from '../contexts/AuthContext';

export default function Header() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <NavbarBrand>Track Trackers</NavbarBrand>
          <Nav className="me-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/admin">
                  Admin
                </Nav.Link>
                <Nav.Link as={Link} to="/logout">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
