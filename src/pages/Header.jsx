// Libraries

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
      <Navbar className='bg-slate-800 text-slate-200 px-3 py-1'>
        <Container>
          <NavbarBrand>Track Trackers Admin Tools</NavbarBrand>
          <Nav className="flex justify-between">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#logout">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
