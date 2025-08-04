import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container className="py-5">
      <Card className="mx-auto" style={{ maxWidth: '500px' }}>
        <Card.Header>
          <h1 className="text-center mb-0">Join MTG Forge</h1>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger" role="alert">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="reg-username">Username *</Form.Label>
              <Form.Control
                id="reg-username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                required
                aria-describedby="username-help"
              />
              <Form.Text id="username-help" className="text-muted">
                At least 3 characters, will be shown on your posts
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="reg-email">Email Address *</Form.Label>
              <Form.Control
                id="reg-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                aria-describedby="email-help"
              />
              <Form.Text id="email-help" className="text-muted">
                We'll never share your email with anyone else
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="reg-password">Password *</Form.Label>
              <Form.Control
                id="reg-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                aria-describedby="password-help"
              />
              <Form.Text id="password-help" className="text-muted">
                At least 6 characters
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label htmlFor="reg-confirm-password">Confirm Password *</Form.Label>
              <Form.Control
                id="reg-confirm-password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                aria-describedby="confirm-password-help"
              />
              <Form.Text id="confirm-password-help" className="text-muted">
                Must match your password above
              </Form.Text>
            </Form.Group>

            <Button 
              variant="success" 
              type="submit" 
              className="w-100 mb-3"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </Form>

          <div className="text-center">
            <p className="mb-0">
              Already have an account? <Link to="/login">Sign in here</Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Register;