import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchStories } from './helpers/fetchStoryData';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Main from './components/Main';
import { getNewWords, getCocaWords } from './helpers/getWords';
import { addStories } from './actions';

function App() {
  const dispatch = useDispatch();

  const initialLoad = async () => {
    // setIsLoading(true);
    const wordList = getNewWords();
    const cocaWords = getCocaWords();
    const storiesData = await fetchStories(
      'news',
      await wordList,
      await cocaWords
    );

    dispatch(addStories(storiesData));
    // setIsLoading(false);
  };

  useEffect(() => {
    initialLoad();
  }, []);

  // const [query, setQuery] = useState('');

  // const stories = useSelector((state) => state);
  // const dispatch = useDispatch();

  // console.log('app stories', stories);

  // useEffect(() => {
  //   dispatch(fetchStories('brazil'));
  // }, []);

  // const getData = async () => {
  //   console.log('stories', await stories);
  // };

  return (
    <div className="App">
      <Header />
      <SearchBar />
      <Main />
    </div>
  );
}

export default App;
