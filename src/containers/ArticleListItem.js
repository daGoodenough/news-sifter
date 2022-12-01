/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-shadow */

import { useSelector, useDispatch } from 'react-redux';
import { addHistory } from '../actions';

const ArticleListItem = ({ id, history }) => {
  const stories = useSelector((state) => state.articles);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(addHistory(stories[id]));
    history.push(`/${stories[id].id}`);
    console.log('State from article List item:', state);
  };

  return (
    <tbody>
      <tr>
        <td>
          <div className="box-bg-img">
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
      </tr>
    </tbody>
  );
};

export default ArticleListItem;
