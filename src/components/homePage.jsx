import { Container, Row, Col, Card } from 'react-bootstrap';
import PostList from './PostList';

function HomePage() {
  const samplePosts = [
    // posts data
  ];

  const featuredPost = {
    title: "Featured: Complete Guide to Commander Format",
    author: "CommanderElivs",
    preview: "Everything you need to know about the most popular MTG format...",
  };

  return (
    <Container className="py-4">
      <Row>
        {/* Main Content Column */}
        <Col lg={8}>
          <h2 className="mb-4">Recent Posts</h2>
          <PostList posts={samplePosts} />
        </Col>
        
        {/* Sidebar for Desktop */}
        <Col lg={4} className="d-none d-lg-block">
          {/* Featured Post */}
          <Card className="mb-4 bg-light">
            <Card.Body>
              <h5 className="text-primary">📌 Featured Post</h5>
              <Card.Title className="h6">{featuredPost.title}</Card.Title>
              <Card.Text className="small">{featuredPost.preview}</Card.Text>
              <small className="text-muted">by {featuredPost.author}</small>
            </Card.Body>
          </Card>
          
          {/* Quick Stats */}
          <Card className="mb-4">
            <Card.Body>
              <h5>📊 Community Stats</h5>
              <p className="mb-1">👥 Active Users: 1,234</p>
              <p className="mb-1">📝 Total Posts: 567</p>
              <p className="mb-1">💬 Comments Today: 89</p>
            </Card.Body>
          </Card>
          
          {/* Format Filter */}
          <Card>
            <Card.Body>
              <h5>🎮 Browse by Format</h5>
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary btn-sm">Standard</button>
                <button className="btn btn-outline-success btn-sm">Modern</button>
                <button className="btn btn-outline-danger btn-sm">Commander</button>
                <button className="btn btn-outline-warning btn-sm">Limited</button>
                <button className="btn btn-outline-info btn-sm">Legacy</button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;