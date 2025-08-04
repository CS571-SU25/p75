import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navigation() {
  const { currentUser, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
      <Navbar.Brand as={Link} to="/">⚡ MTG Forge</Navbar.Brand>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          {isLoggedIn && (
            <Nav.Link as={Link} to="/create">Create Post</Nav.Link>
          )}
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
        </Nav>
        
        <Nav>
          {isLoggedIn ? (
            <div className="d-flex align-items-center gap-3">
              <NavDropdown 
                title={
                  <span>
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.username}
                      className="rounded-circle me-2"
                      width="24"
                      height="24"
                    />
                    {currentUser.username}
                  </span>
                } 
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/login">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              
              {/* Direct logout button - more visible */}
              <Button 
                variant="outline-light" 
                size="sm" 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Nav.Link as={Link} to="/login">
              <Button variant="outline-light" size="sm">
                Login / Register
              </Button>
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;