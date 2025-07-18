import { Container, Form, Button, Card } from 'react-bootstrap';
import { useState } from 'react';

function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    format: 'Standard',
    content: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Post submitted:', formData);
    // Later: Send to backend
    alert('Post created successfully!');
  };

  return (
    <Container className="py-4">
      <Card className="mx-auto" style={{ maxWidth: '800px' }}>
        <Card.Body>
          <h3 className="mb-4">Create New Post</h3>
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your post title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Format</Form.Label>
              <Form.Select 
                value={formData.format}
                onChange={(e) => setFormData({...formData, format: e.target.value})}
              >
                <option value="Standard">Standard</option>
                <option value="Modern">Modern</option>
                <option value="Commander">Commander</option>
                <option value="Limited">Limited</option>
                <option value="Legacy">Legacy</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={8}
                placeholder="Share your deck list, strategy, or MTG story..."
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                required
              />
              <Form.Text className="text-muted">
                You can include deck lists, card names, strategies, or tournament reports
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Publish Post
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CreatePost;