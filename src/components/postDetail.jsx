import { Container, Card, Badge, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function PostDetail() {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  
  const post = {
    id: id,
    title: "My First Commander Deck Build",
    author: "PlayerOne",
    format: "Commander",
    content: `Just finished building my first Commander deck around Atraxa, Praetors' Voice!

I've been playing Standard for a while but decided to try Commander after watching some games at my LGS. The politics and multiplayer aspect really appealed to me.

**Commander:** Atraxa, Praetors' Voice

**Theme:** +1/+1 Counters and Proliferate

**Key Cards:**
- Doubling Season
- Hardened Scales
- Kalonian Hydra
- Corpsejack Menace

The deck focuses on putting counters on creatures and then proliferating them to create massive threats. I've included some planeswalkers too since Atraxa can proliferate their loyalty counters.

Has anyone else built around Atraxa? What strategies have worked for you?`,
    likes: 12,
    date: "2025-01-18",
    comments: [
      { id: 1, author: "CommanderFan", text: "Great choice! Atraxa is so versatile." },
      { id: 2, author: "ProliferateKing", text: "Try adding Deepglow Skate for instant planeswalker ultimates!" }
    ]
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log('Comment submitted:', comment);
    setComment('');
    alert('Comment posted!');
  };

  return (
    <Container className="py-4">
      <Card className="mx-auto mb-4" style={{ maxWidth: '800px' }}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h2>{post.title}</h2>
            <Badge bg="danger" className="fs-6">{post.format}</Badge>
          </div>
          
          <p className="text-muted">by {post.author} • {post.date}</p>
          
          <hr />
          
          <div className="post-content" style={{ whiteSpace: 'pre-wrap' }}>
            {post.content}
          </div>
          
          <hr />
          
          <Button variant="outline-primary" className="me-2">
            👍 Like ({post.likes})
          </Button>
          <Button variant="outline-secondary">
            🔖 Bookmark
          </Button>
        </Card.Body>
      </Card>

      {/* Comments Section */}
      <Card className="mx-auto" style={{ maxWidth: '800px' }}>
        <Card.Body>
          <h4 className="mb-3">Comments ({post.comments.length})</h4>
          
          {post.comments.map(comment => (
            <div key={comment.id} className="mb-3 p-3 bg-light rounded">
              <strong>{comment.author}</strong>
              <p className="mb-0 mt-1">{comment.text}</p>
            </div>
          ))}
          
          <Form onSubmit={handleCommentSubmit} className="mt-4">
            <Form.Group className="mb-3">
              <Form.Label>Add a comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Share your thoughts..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">Post Comment</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PostDetail;