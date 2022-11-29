import { Form, InputGroup, Col, Row } from 'react-bootstrap';

const SearchBar = () => (
  <Row>
    <Col md={{ span: 6, offset: 3 }}>
      <Form>
        <Form.Group>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search to find articles..."
            />
            <InputGroup.Text role="button" type="submit">
              Search
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Row className="pt-3">
          <Col md={4}>
            <Form.Group>
              <InputGroup>
                <Form.Select aria-label="Default select example">
                  <option>Language</option>
                  <option value="en">English</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <InputGroup>
                <Form.Select aria-label="Default select example">
                  <option>Reading Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <InputGroup>
                <Form.Select aria-label="Default select example">
                  <option>Sort By</option>
                  <option value="beginnerToAdvanced">
                    Beginner - Advanced
                  </option>
                  <option value="advancedToBeginner">
                    Advanced - Beginner
                  </option>
                </Form.Select>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Col>
  </Row>
);

export default SearchBar;
