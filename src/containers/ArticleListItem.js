/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { useSelector } from 'react-redux';

const ArticleListItem = ({ id, history }) => {
  const stories = useSelector((state) => state.articles);
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
          <h3 onClick={() => history.push(`/${stories[id].id}`)}>
            {stories[id].title}
          </h3>
          <small>{stories[id].source}</small>
          <small> | {stories[id].author}</small>
          <p>{stories[id].description}</p>
        </td>
        <td>
          <img src={stories[id].image} alt="article header" />
        </td>
      </tr>
    </tbody>
  );
};

export default ArticleListItem;
