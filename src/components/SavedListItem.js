/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addHistory, addSaved, removeSaved } from '../actions';

const SavedListItem = ({ id, history }) => {
  const [isSaved, setIsSaved] = useState(true);
  const dispatch = useDispatch();
  const savedStories = useSelector((state) => state.saved);
  const clickHandler = () => {
    dispatch(addHistory(stories[id]));
    history.push(`/${stories[id].id}`);
  };

  const handleSaveClick = () => {
    if (Object.hasOwn(savedStories, id)) {
      dispatch(removeSaved(stories[id]));
      setIsSaved(false);
    } else {
      dispatch(addSaved(stories[id]));
      setIsSaved(true);
    }
  };

  const stories = useSelector((state) => state.saved);
  return (
    <tbody>
      <tr>
        <td>
          <div className="reading-level-box">
            <ul>
              <h6>
                <u>Article Info</u>
              </h6>
              <li>Word count: {stories[id].wordCount}</li>
              <li>Beginner words: {stories[id].beginnerWords}</li>
              <li>Intermediate words: {stories[id].intermediateWords}</li>
              <li>Advanced words: {stories[id].advancedWords}</li>
            </ul>
          </div>
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

export default SavedListItem;
