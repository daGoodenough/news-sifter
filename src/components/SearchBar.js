import { Form, InputGroup, Col, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStories } from '../helpers/fetchStoryData';
import {
  addStories,
  changeDifficulty,
  changeLanguage,
  changeSortBy,
} from '../actions';
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

async function getNewWords() {
  const lemmas = [];
  const wordForms = [];
  const response = await fetch('ANCallcount.csv');
  const data = await response.text();
  const table = data.split(/\r?\n/).slice(1);
  table.forEach((row) => {
    const columns = row.split(',');
    const lemma = columns[1];
    const wordForm = columns[0];
    lemmas.push(lemma);
    wordForms.push(wordForm);
  });
  const wordList = {};
  wordList.lemmas = lemmas;
  wordList.wordForms = wordForms;
  return wordList;
}

async function getCocaWords() {
  const cocaWords = [];
  const response = await fetch('COCA60K.csv');
  const data = await response.text();
  const table = data.split(/\r?\n/).slice(1);
  table.forEach((row) => {
    const columns = row.split(',');
    const cocaWord = columns[0];
    cocaWords.push(cocaWord);
  });
  return cocaWords;
}

const SearchBar = () => {
  const [query, setQuery] = useState('');

  let wordList = {};
  let cocaWords = [];
  const dispatch = useDispatch();

  const handleSubmitClick = async () => {
    wordList = getNewWords();
    cocaWords = getCocaWords();
    const storiesData = await fetchStories(
      query,
      await wordList,
      await cocaWords
    );
    dispatch(addStories(storiesData));
  };

  const handleReadingLevelChange = (e) => {
    // setReadingLevel(e.target.value);
    dispatch(changeDifficulty(e.target.value));
  };

  const handleLanguageChange = (e) => dispatch(changeLanguage(e.target.value));

  const handleSortByChange = (e) => dispatch(changeSortBy(e.target.value));

  return (
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
  );
};

export default SearchBar;
