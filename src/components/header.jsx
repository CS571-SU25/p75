import { Container } from 'react-bootstrap';

function Header() {
  return (
    <header className="bg-dark text-white py-3">
      <Container>
        <div className="text-center">
          <h1 className="display-5">🎴 MTG Community Forge</h1>
          <p className="lead mb-0">Share Decks • Discuss Strategies • Connect with Players</p>
        </div>
      </Container>
    </header>
  );
}

export default Header;