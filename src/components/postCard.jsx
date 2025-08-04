import { Card, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../contexts/PostsContext';

function PostCard({ post }) {
  const navigate = useNavigate();
  const { likePost, deletePost } = usePosts();

  if (!post) {
    return null;
  }

  const commentsCount = Array.isArray(post.comments) ? post.comments.length : 0;
  
  const handleReadMore = () => {
    navigate(`/post/${post.id}`);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    likePost(post.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
    }
  };

  const canDelete = post.author === "You"; // Only show delete for user's own posts

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-1">{post.title}</h5>
          <div className="d-flex gap-2 align-items-center">
            <Badge bg="secondary">{post.format}</Badge>
            {canDelete && (
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={handleDelete}
                title="Delete post"
              >
                🗑️
              </Button>
            )}
          </div>
        </div>
        
        <p className="text-muted small mb-2">
          By {post.author} on {post.date}
        </p>
        
        <p className="card-text">{post.preview}</p>
        
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Button 
              variant="link" 
              className="p-0 me-3 text-decoration-none"
              onClick={handleLike}
            >
              👍 {post.likes || 0}
            </Button>
            <span>💬 {commentsCount}</span>
          </div>
          <Button 
            variant="outline-primary" 
            size="sm"
            onClick={handleReadMore}
          >
            Read More
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PostCard;