import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { usePosts } from '../contexts/PostsContext';
import PostList from './PostList';

function HomePage() {
  const { posts } = usePosts();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFormat, setFilterFormat] = useState('All');
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setSearchResults(null);
      return;
    }
    
    const results = posts.filter(post =>
      post.title.toLowerCase().includes(term.toLowerCase()) ||
      post.preview.toLowerCase().includes(term.toLowerCase()) ||
      post.content?.toLowerCase().includes(term.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
    );
    setSearchResults(results);
  };

  const handleFilterFormat = (format) => {
    setFilterFormat(format);
  };

  const getDisplayPosts = () => {
    let displayPosts = searchResults !== null ? searchResults : posts;
    
    if (filterFormat !== 'All') {
      displayPosts = displayPosts.filter(post => post.format === filterFormat);
    }
    
    return displayPosts;
  };

  const displayPosts = getDisplayPosts();

  // Calculate dynamic stats
  const totalComments = posts.reduce((total, post) => total + (post.comments?.length || 0), 0);
  const formatCounts = posts.reduce((counts, post) => {
    counts[post.format] = (counts[post.format] || 0) + 1;
    return counts;
  }, {});

  return (
    <Container className="py-4">
      <Row>
        <Col lg={9}>
          <h1 className="display-5 mb-4">MTG Community Feed</h1>
          
          {/* Simple Search Bar */}
          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3">🔍 Search & Filter Posts</h5>
              <Row>
                <Col md={8}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search posts, cards, or strategies..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </Col>
                <Col md={4}>
                  <select
                    className="form-select"
                    value={filterFormat}
                    onChange={(e) => handleFilterFormat(e.target.value)}
                  >
                    <option value="All">All Formats</option>
                    <option value="Standard">Standard</option>
                    <option value="Modern">Modern</option>
                    <option value="Commander">Commander</option>
                    <option value="Limited">Limited</option>
                    <option value="Legacy">Legacy</option>
                    <option value="Pioneer">Pioneer</option>
                    <option value="Pauper">Pauper</option>
                    <option value="Other">Other</option>
                  </select>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          
          {searchTerm && (
            <Alert variant="info" className="mb-4">
              {displayPosts.length} result{displayPosts.length !== 1 ? 's' : ''} found for "{searchTerm}"
              {filterFormat !== 'All' && ` in ${filterFormat} format`}
            </Alert>
          )}
          
          {filterFormat !== 'All' && !searchTerm && (
            <Alert variant="secondary" className="mb-4">
              Showing {displayPosts.length} post{displayPosts.length !== 1 ? 's' : ''} in {filterFormat} format
            </Alert>
          )}
          
          {posts.length === 0 && (
            <Alert variant="info" className="text-center">
              <h5>Welcome to MTG Community Forge!</h5>
              <p>Be the first to share a post with the community.</p>
            </Alert>
          )}
          
          {displayPosts.length === 0 && posts.length > 0 && (
            <Alert variant="warning" className="text-center">
              <h5>No posts found</h5>
              <p>Try adjusting your search terms or filter settings.</p>
            </Alert>
          )}
          
          <PostList posts={displayPosts} />
        </Col>
        
        <Col lg={3} className="d-none d-lg-block">
          <Card className="mb-4 border-primary">
            <Card.Header className="bg-primary text-white">
              <h6 className="mb-0">📊 Community Stats</h6>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Total Posts:</span>
                <strong>{posts.length}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Total Comments:</span>
                <strong>{totalComments}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Active Users:</span>
                <strong>1,234</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span>Online Now:</span>
                <strong className="text-success">45</strong>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="mb-4">
            <Card.Header>
              <h6 className="mb-0">🔥 Popular Formats</h6>
            </Card.Header>
            <Card.Body>
              <div className="d-flex flex-wrap gap-2">
                {Object.entries(formatCounts).length > 0 ? (
                  Object.entries(formatCounts).map(([format, count]) => (
                    <span key={format} className="badge bg-secondary">
                      {format} ({count})
                    </span>
                  ))
                ) : (
                  <span className="text-muted">No posts yet</span>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;