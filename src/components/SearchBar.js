import { Form, InputGroup, Col, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchStories } from '../helpers/fetchStoryData';
import { addStories } from '../actions';
/* eslint-disable no-unused-vars */
async function getWordList() {
  const lemmas = [];
  const lemRanks = [];
  const wordForms = [];
  const response = await fetch('wordForms.csv');
  const data = await response.text();
  const table = data.split(/\r?\n/).slice(1);
  table.forEach((row) => {
    const columns = row.split(',');
    const lemRank = columns[0];
    const lemma = columns[1];
    const wordForm = columns[5];
    lemRanks.push(parseFloat(lemRank));
    lemmas.push(lemma);
    wordForms.push(wordForm);
  });
  const wordList = {};
  wordList.lemmas = lemmas;
  wordList.lemRanks = lemRanks;
  wordList.wordForms = wordForms;
  return wordList;
}

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('');
  const [readingLevel, setReadingLevel] = useState('');
  const [sortMethod, setSortMethod] = useState('');

  let wordList = {};

  useEffect(() => {
    wordList = getWordList();
  }, []);

  const dispatch = useDispatch();

  const handleSubmitClick = async () => {
    const storiesData = await fetchStories(query, await wordList);
    dispatch(addStories(storiesData));
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
