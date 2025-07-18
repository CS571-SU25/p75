import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

function Navigation() {
  return (
    <Navbar bg="secondary" variant="dark" expand="lg" sticky="top" className="w-100">
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/" className="fs-4 fw-bold">MTG Forge</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-4">
            <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>
            <Nav.Link as={Link} to="/posts" className="mx-2">All Posts</Nav.Link>
            <Nav.Link as={Link} to="/create" className="mx-2">Create Post</Nav.Link>
            <Nav.Link as={Link} to="/about" className="mx-2">About</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login">
              <Button variant="outline-light">Login</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;