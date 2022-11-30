/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';

const ArticleListItem = ({ id }) => {
  const stories = useSelector((state) => state.articles);
  console.log('item', stories[id]);

  return (
    <tr>
      <td>
        <img src={stories[id].image} alt="article header" />
      </td>
      <td className="flex-cell">
        <div>{stories[id].title}</div>
        <div>{stories[id].description}</div>
      </td>
      <td>
        <div>Word count: {stories[id].wordCount}</div>
        <div>Beginner words: {stories[id].beginnerWords}</div>
        <div>Intermediate words: {stories[id].intermediateWords}</div>
        <div>Advanced words: {stories[id].advancedWords}</div>
      </td>
    </tr>
  );
};

export default ArticleListItem;
