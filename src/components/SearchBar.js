import { Form, InputGroup, Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchStories } from '../helpers/fetchStoryData';
// import addStories from 'somewhere'

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('');
  const [readingLevel, setReadingLevel] = useState('');
  const [sortMethod, setSortMethod] = useState('');

  const dispatch = useDispatch();

  const handleSubmitClick = async () => {
    const storiesData = await fetchStories(query);
    console.log('storiesdata', storiesData);

    // dispatch(addStories(storiesData));
    // either dispatch all the state information to fetchSotries
    // or dispatch to a different part of the store that will keep track of language, readingLevel, and sortMethod
  };

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <Form>
          <Form.Group>
            <InputGroup>
              <Form.Control
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search to find articles..."
              />
              <InputGroup.Text
                onClick={handleSubmitClick}
                role="button"
                type="submit"
              >
                Search
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Row className="pt-3">
            <Col md={4}>
              <Form.Group>
                <InputGroup>
                  <Form.Select
                    onChange={(e) => setLanguage(e.target.value)}
                    aria-label="Default select example"
                  >
                    <option>Language</option>
                    <option value="en">English</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <InputGroup>
                  <Form.Select
                    onChange={(e) => setReadingLevel(e.target.value)}
                    aria-label="Default select example"
                  >
                    <option>Reading Level</option>

                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <InputGroup>
                  <Form.Select
                    onChange={(e) => setSortMethod(e.target.value)}
                    aria-label="Default select example"
                  >
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
};

export default SearchBar;
