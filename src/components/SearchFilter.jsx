import { Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

function SearchFilter({ onSearch, onFilterFormat }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('All');

  const formats = ['All', 'Standard', 'Modern', 'Commander', 'Limited', 'Legacy'];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleFormatChange = (format) => {
    setSelectedFormat(format);
    onFilterFormat(format);
  };

  return (
    <div className="bg-light p-4 rounded mb-4">
      <h5 className="mb-3">🔍 Search & Filter Posts</h5>
      <Row>
        <Col md={8}>
          <Form onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search posts, cards, or strategies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search posts"
              />
              <Button variant="primary" type="submit">
                Search
              </Button>
            </InputGroup>
          </Form>
        </Col>
        <Col md={4}>
          <Form.Select
            value={selectedFormat}
            onChange={(e) => handleFormatChange(e.target.value)}
            aria-label="Filter by format"
          >
            {formats.map(format => (
              <option key={format} value={format}>{format}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </div>
  );
}

export default SearchFilter;