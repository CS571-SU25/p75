import { Container, Card, Badge, Button, Form, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { usePosts } from '../contexts/PostsContext';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPostById, addComment, likePost, deletePost } = usePosts();
  const [newComment, setNewComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);

  const post = getPostById(id);

  if (!post) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          <h4>Post Not Found</h4>
          <p>The post you're looking for doesn't exist.</p>
          <Button variant="outline-secondary" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Alert>
      </Container>
    );
  }

  const handleLike = () => {
    likePost(post.id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
      navigate('/');
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(post.id, newComment.trim());
      setNewComment('');
      setShowCommentForm(false);
    }
  };

  const canDelete = post.author === "You";
  const commentsCount = Array.isArray(post.comments) ? post.comments.length : 0;

  return (
    <Container className="py-4">
      <div className="mb-3">
        <Button variant="outline-secondary" onClick={() => navigate('/')}>
          ← Back to Posts
        </Button>
      </div>

      <Card>
        <Card.Body>
          {/* Post Header */}
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h1 className="h2 mb-2">{post.title}</h1>
              <div className="d-flex gap-2 align-items-center mb-2">
                <Badge bg="primary">{post.format}</Badge>
                <span className="text-muted">
                  By {post.author} on {post.date}
                </span>
              </div>
            </div>
            {canDelete && (
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={handleDelete}
              >
                Delete Post
              </Button>
            )}
          </div>

          {/* Post Content */}
          <div className="mb-4">
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
              {post.content}
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-4">
              <h6>Tags:</h6>
              <div className="d-flex flex-wrap gap-1">
                {post.tags.map((tag, index) => (
                  <Badge key={index} bg="secondary" className="me-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Like and Comment Actions */}
          <div className="d-flex gap-3 mb-4 pb-3 border-bottom">
            <Button 
              variant="outline-primary" 
              onClick={handleLike}
              className="d-flex align-items-center gap-1"
            >
              👍 Like ({post.likes || 0})
            </Button>
            <Button 
              variant="outline-secondary"
              onClick={() => setShowCommentForm(!showCommentForm)}
              className="d-flex align-items-center gap-1"
            >
              💬 Comment ({commentsCount})
            </Button>
          </div>

          {/* Add Comment Form */}
          {showCommentForm && (
            <Form onSubmit={handleAddComment} className="mb-4">
              <Form.Group className="mb-3">
                <Form.Label>Add a comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  required
                />
              </Form.Group>
              <div className="d-flex gap-2">
                <Button type="submit" variant="primary">
                  Post Comment
                </Button>
                <Button 
                  type="button" 
                  variant="outline-secondary"
                  onClick={() => {
                    setShowCommentForm(false);
                    setNewComment('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}

          {/* Comments Section */}
          <div>
            <h5 className="mb-3">Comments ({commentsCount})</h5>
            {commentsCount === 0 ? (
              <p className="text-muted">No comments yet. Be the first to comment!</p>
            ) : (
              <div>
                {post.comments.map((comment) => (
                  <Card key={comment.id} className="mb-2 border-start border-primary border-3">
                    <Card.Body className="py-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <strong>{comment.author}</strong>
                        <small className="text-muted">{comment.date}</small>
                      </div>
                      <p className="mb-0">{comment.text}</p>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PostDetail;