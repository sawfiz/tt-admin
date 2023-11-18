// Libraries
import { Link } from 'react-router-dom';

// Config

// Contexts

// Components

// Styling
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';

export default function Header() {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <NavbarBrand>Admin Frontend</NavbarBrand>
          <Nav className="me-auto">
            {/* <Nav.Link href="/">Home</Nav.Link> */}
            <Link to="/">Home</Link>
            {/* <Nav.Link href="/admin">Admin</Nav.Link> */}
            <Link to="/admin">Admin</Link>
            {/* <Nav.Link href="/logout">Logout</Nav.Link> */}
            <Link to="/logout">Logout</Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
