import { Card, Button } from 'react-bootstrap';

function ContactCard({ name, email, role }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{role}</Card.Subtitle>
        <Card.Text>
          Contact: {email}
        </Card.Text>
        <Button variant="primary">Send Message</Button>
      </Card.Body>
    </Card>
  );
}

export default ContactCard;