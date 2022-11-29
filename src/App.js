import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';
import { fetchStories } from './actions';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  // const [query, setQuery] = useState('');

  const stories = useSelector((state) => state);
  const dispatch = useDispatch();


  useEffect(() =>{
    dispatch(fetchStories('brazil'))
    },[])

    console.log('stories', stories);


  return (
    <div className="App">
      {/* <Header />
      <SearchBar />
      <Main /> */}
    </div>
  );
}

export default App;
