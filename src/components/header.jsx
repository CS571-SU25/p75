import { Container } from 'react-bootstrap';

function Header() {
  return (
    <header className="bg-primary text-white py-4 mb-4">
      <Container className="text-center">
        <h1 className="display-4 mb-2">🎴 MTG Community Forge</h1>
        <p className="lead mb-3">Share Decks • Discuss Strategies • Connect with Players</p>
        <div className="d-flex justify-content-center align-items-center gap-3">
          <span className="h5 mb-0">🌟 Join our growing community</span>
          <span className="badge bg-light text-dark px-3 py-2">
            Currently <strong>1,234</strong> active players
          </span>
        </div>
      </Container>
    </header>
  );
}

export default Header;