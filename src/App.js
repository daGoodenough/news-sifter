import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';
import { fetchStories } from './actions';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  // const [query, setQuery] = useState('');

  const stories = useSelector((state) => state.articles);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStories());
  }, []);

  // const getData = async () => {
  //   console.log('stories', await stories);
  // };

  return (
    <div className="App">
      <p>Hello world</p>
      {/* <Header />
      <SearchBar /> */}
      <Main />
    </div>
  );
}

export default App;
