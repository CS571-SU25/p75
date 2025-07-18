import { Container, Card } from 'react-bootstrap';

function AboutPage() {
  return (
    <Container className="py-5">
      <Card className="mx-auto" style={{ maxWidth: '800px' }}>
        <Card.Body>
          <h2 className="mb-4">About MTG Community Forge</h2>
          
          <p>
            Welcome to MTG Community Forge, an interactive platform dedicated to 
            the Magic: The Gathering community. This is a space where players of 
            all skill levels can come together to share their passion for the game.
          </p>

          <p className="mt-4">
            <strong>Created by:</strong> Jiahe Zhang (ELVIS078)<br />
            <strong>Course:</strong> CS571 Summer 2025
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AboutPage;