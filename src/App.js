/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import React, { useEffect, useState, useRef } from 'react';
import { fetchStories } from './helpers/fetchStoryData';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Main from './components/Main';
// import { getNewWords, getCocaWords } from './helpers/getWords';
import { addStories } from './actions';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [cocaWords, setCocaWords] = useState([]);
  const [wordList, setWordList] = useState({});

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
    const results = { lemmas, wordForms };
    return results;
  }

  async function getCocaWords() {
    const results = [];
    const response = await fetch('COCA60K.csv');
    const data = await response.text();
    const table = data.split(/\r?\n/).slice(1);
    table.forEach((row) => {
      const columns = row.split(',');
      const cocaWord = columns[0];
      results.push(cocaWord);
    });
    return results;
  }

  const initialLoad = async () => {
    setIsLoading(true);
    const a = await getCocaWords();
    const b = await getNewWords();
    setCocaWords(a);
    setWordList(b);
    const storiesData = await fetchStories('news', b, a);

    dispatch(addStories(storiesData));
    setIsLoading(false);
  };

  useEffect(() => {
    initialLoad();
  }, []);

  return (
    <div className="App">
      <Header />
      <SearchBar cocaWords={cocaWords} wordList={wordList} />
      <Row>
        <Col xs={{ offset: 6 }}>
          {isLoading ? <div className="loader" /> : null}
        </Col>
      </Row>
      <Main />
    </div>
  );
}

export default App;
