import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../contexts/PostsContext';

function CreatePost() {
  const navigate = useNavigate();
  const { addPost } = usePosts();
  
  const [formData, setFormData] = useState({
    title: '',
    format: 'Standard',
    content: '',
    preview: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      if (!formData.content.trim()) {
        throw new Error('Content is required');
      }

      const preview = formData.preview.trim() || 
        formData.content.substring(0, 150) + (formData.content.length > 150 ? '...' : '');

      // Create the post using context
      const newPostId = addPost({
        title: formData.title.trim(),
        format: formData.format,
        content: formData.content.trim(),
        preview: preview
      });

      // Reset form
      setFormData({
        title: '',
        format: 'Standard',
        content: '',
        preview: ''
      });

      // Go back to homepage to see the new post
      navigate('/');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Container className="py-4">
      <Card className="mx-auto" style={{ maxWidth: '800px' }}>
        <Card.Body>
          <h2 className="mb-4">Create New Post</h2>
          
          {error && (
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title <span className="text-danger">*</span></Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your post title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Format</Form.Label>
              <Form.Select 
                value={formData.format}
                onChange={(e) => handleChange('format', e.target.value)}
              >
                <option value="Standard">Standard</option>
                <option value="Modern">Modern</option>
                <option value="Commander">Commander</option>
                <option value="Limited">Limited</option>
                <option value="Legacy">Legacy</option>
                <option value="Pioneer">Pioneer</option>
                <option value="Pauper">Pauper</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Preview (Optional)</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={2}
                placeholder="Brief preview (auto-generated if empty)"
                value={formData.preview}
                onChange={(e) => handleChange('preview', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Content <span className="text-danger">*</span></Form.Label>
              <Form.Control 
                as="textarea" 
                rows={8}
                placeholder="Share your deck list, strategy, tournament report..."
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button 
                variant="primary" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Publish Post'}
              </Button>
              
              <Button 
                variant="outline-secondary" 
                type="button"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CreatePost;