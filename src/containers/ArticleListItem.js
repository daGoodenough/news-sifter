/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-shadow */

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addHistory, addSaved, removeSaved } from '../actions';

const ArticleListItem = ({ id, history }) => {
  const [isHovering, setIsHovering] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const stories = useSelector((state) => state.articles);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(addHistory(stories[id]));
    history.push(`/${stories[id].id}`);
    console.log('State from article List item:', state);
  };

  const handleSaveClick = () => {
    if (!isSaved) {
      dispatch(addSaved(stories[id]));
      setIsSaved(true);
    } else {
      dispatch(removeSaved(stories[id]));
      setIsSaved(false);
    }
    console.log(state);
  };
  const calculatePercentage = (readingLevel) =>
    `${Math.floor(readingLevel * 100)}%`;

  return (
    <tbody>
      <tr>
        <td>
          <div
            className="reading-level-box"
            onMouseEnter={() => {
              setIsHovering(`${stories[id].id}`);
            }}
            onMouseLeave={() => {
              setIsHovering('');
            }}
          >
            <div
              className="extra-reading-level-info"
              style={{
                display: isHovering === `${stories[id].id}` ? 'block' : 'none',
              }}
            >
              <div className="extra-reading-level-info-text">
                <h5>Advanced words:</h5>
                <p>{stories[id].wordsToShow}</p>
              </div>
            </div>
            <ul>
              <h6>
                <u>Article Info</u>
              </h6>
              <li>Word count: {stories[id].wordCount}</li>
              <li>
                Beginner words: {Math.floor(100 * stories[id].beginnerWords)}%
              </li>
              <li>
                Intermediate words:{' '}
                {Math.floor(100 * stories[id].intermediateWords)}%
              </li>
              <li>
                Advanced words: {Math.floor(100 * stories[id].advancedWords)}%
              </li>
            </ul>
          </div>
          <div className="relatively-positioned-div" />
        </td>
        <td className="article-text-cell">
          <h3 onClick={clickHandler}>{stories[id].title}</h3>
          <small>{stories[id].source}</small>
          <small> | {stories[id].author}</small>
          <p>{stories[id].description}</p>
        </td>
        <td>
          <img
            onClick={clickHandler}
            src={stories[id].image}
            alt="article header"
          />
        </td>
        <td>
          <i
            onClick={handleSaveClick}
            className="fa-solid fa-star"
            style={{
              color: isSaved ? 'yellow' : '',
            }}
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ArticleListItem;
