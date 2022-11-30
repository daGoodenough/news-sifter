/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';

const ArticleListItem = ({ id }) => {
  const stories = useSelector((state) => state.articles);
  return (
    <tbody>
      <tr>
        <td>
          <img src={stories[id].image} alt="article header" />
        </td>
        <td className="article-text-cell">
          <h3>
            <a>{stories[id].title}</a>
          </h3>
          <small>{stories[id].source}</small>
          <small> | {stories[id].author}</small>
          <p>{stories[id].description}</p>
        </td>
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
      </tr>
    </tbody>
  );
};

export default ArticleListItem;
