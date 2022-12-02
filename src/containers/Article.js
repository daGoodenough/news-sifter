/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-useless-escape */

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { addSaved, removeSaved } from '../actions';

const Article = (props) => {
  const stories = useSelector((state) => state.articles);
  const savedStories = useSelector((state) => state.saved);
  const thisURL = window.location.href;
  const id = parseInt(thisURL.substring(thisURL.lastIndexOf('/') + 1));
  const thisArticle = _.find(stories, (element) => element.id === id);
  const dispatch = useDispatch();
  const [isHighlighted, setIsHighlighted] = useState(false);

  const handleSaveClick = () => {
    if (Object.hasOwn(savedStories, thisArticle.id)) {
      dispatch(removeSaved(thisArticle));
    } else {
      dispatch(addSaved(thisArticle));
    }
  };

  // let articleWithHighlightedWords;

  // useEffect(() => {
  //   articleWithHighlightedWords = highlightText(
  //     thisArticle.wordsNotToShow,
  //     thisArticle.htmlContent
  //   );
  // }, []);

  const handleHighlightClick = () => {
    if (isHighlighted) setIsHighlighted(false);
    else setIsHighlighted(true);
  };

  function highlightText(arr, article) {
    const spaced = article
      .replaceAll('<', ' <')
      .replaceAll('>', '> ')
      .replaceAll('—', ', ');
    const splitUp = spaced.split(' ');
    const highlightedArticle = splitUp.map((i) => {
      if (arr.includes(i.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ''))) {
        return ` <span class="advanced-words-highlighted"> ${i} </span> `;
      }
      return i;
    });
    const joined = highlightedArticle.join(' ');
    return joined.replaceAll(' <', '<').replaceAll('> ', '>');
  }

  return (
    <div>
      <div className="sidebar-left">
        <h5 className="back-button">
          <Link to="/">Back</Link>
        </h5>
        <button
          onClick={handleHighlightClick}
          type="button"
          className="highlight-button btn btn-warning"
        >
          Highlight Advanced Words
        </button>
      </div>

      {Object.hasOwn(savedStories, thisArticle.id) ? (
        <h5 onClick={handleSaveClick} className="save-button saved">
          Saved
        </h5>
      ) : (
        <h5 onClick={handleSaveClick} className="save-button">
          Save
        </h5>
      )}
      <div className="article-box">
        <h2>{thisArticle.title}</h2>
        <a href={thisArticle.url}>{thisArticle.url}</a>
        <div className="title-and-author">
          <h6>{thisArticle.author} | </h6> <h6> {thisArticle.source}</h6>
        </div>
        <article
          dangerouslySetInnerHTML={{ __html: thisArticle.htmlContent }}
          style={{
            display: isHighlighted === false ? 'block' : 'none',
          }}
        />
        <article
          dangerouslySetInnerHTML={{
            __html: highlightText(
              thisArticle.wordsNotToShow,
              thisArticle.htmlContent
            ),
          }}
          style={{
            display: isHighlighted === true ? 'block' : 'none',
          }}
        />
      </div>
    </div>
  );
};

export default Article;
