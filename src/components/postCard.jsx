import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PostCard({ post }) {
  const formatColors = {
    'Standard': 'primary',
    'Modern': 'success',
    'Commander': 'danger',
    'Limited': 'warning',
    'Legacy': 'info'
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body className="p-4">
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h4 className="mb-1">
                <Link to={`/post/${post.id}`} className="text-decoration-none text-dark">
                  {post.title}
                </Link>
              </h4>
              <Badge bg={formatColors[post.format] || 'secondary'} className="ms-2">
                {post.format}
              </Badge>
            </div>
            
            <p className="text-muted mb-3">
              <span className="me-3">👤 {post.author}</span>
              <span>📅 {post.date}</span>
            </p>
            
            <p className="mb-3 text-secondary" style={{ fontSize: '1.05rem' }}>
              {post.preview}
            </p>
            
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Button variant="outline-primary" size="sm" className="me-3">
                  👍 {post.likes} Likes
                </Button>
                <span className="text-muted">💬 {post.comments} comments</span>
              </div>
              <Link to={`/post/${post.id}`}>
                <Button variant="primary">Read Full Post →</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default PostCard;