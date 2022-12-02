/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { fetchStories } from './helpers/fetchStoryData';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Main from './components/Main';
import { getNewWords, getCocaWords } from './helpers/getWords';
import { addStories } from './actions';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const initialLoad = async () => {
    setIsLoading(true);
    const wordList = getNewWords();
    const cocaWords = getCocaWords();
    const storiesData = await fetchStories(
      'news',
      await wordList,
      await cocaWords
    );

    dispatch(addStories(storiesData));
    setIsLoading(false);
  };

  useEffect(() => {
    initialLoad();
  }, []);

  return (
    <div className="App">
      <Header />
      <SearchBar />
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
