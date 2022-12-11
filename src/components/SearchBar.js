import { Form, InputGroup, Col, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStories } from '../helpers/fetchStoryData';
// import { getNewWords, getCocaWords } from '../helpers/getWords';
import {
  addStories,
  changeDifficulty,
  changeLanguage,
  changeSortBy,
} from '../actions';

/* eslint-disable no-unused-vars */

const SearchBar = ({ wordList, cocaWords }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // console.log('in search bar', wordList, cocaWords);

  const dispatch = useDispatch();

  const handleSubmitClick = async () => {
    try {
      setIsLoading(true);
      const storiesData = await fetchStories(
        query,
        await wordList,
        await cocaWords
      );
      dispatch(addStories(storiesData));
    } catch (e) {
      console.error(e);
      dispatch(addStories(null));
    } finally {
      setIsLoading(false);
    }
  };

  const handleReadingLevelChange = (e) => {
    dispatch(changeDifficulty(e.target.value));
  };

  const handleLanguageChange = (e) => dispatch(changeLanguage(e.target.value));

  const handleSortByChange = (e) => dispatch(changeSortBy(e.target.value));

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form className="m-3">
            <Form.Group>
              <InputGroup>
                <Form.Control
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="Search to find articles..."
                  className="search-bar"
                />
                <InputGroup.Text
                  onClick={handleSubmitClick}
                  role="button"
                  type="submit"
                  className="btn btn-search"
                  as={Link}
                  to="/"
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
                      onChange={(e) => handleLanguageChange(e)}
                      aria-label="Default select example"
                    >
                      <option>Language</option>
                      <option value="english">English</option>
                    </Form.Select>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <InputGroup>
                    <Form.Select
                      onChange={(e) => handleReadingLevelChange(e)}
                      aria-label="Default select example"
                    >
                      <option value="default">Reading Level</option>

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
                      onChange={(e) => handleSortByChange(e)}
                      aria-label="Default select example"
                    >
                      <option value="default">Sort By</option>
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
      <Row>
        <Col xs={{ offset: 6 }}>
          {isLoading ? <div className="loader" /> : null}
        </Col>
      </Row>
    </>
  );
};

export default SearchBar;
