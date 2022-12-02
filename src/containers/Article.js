/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import _ from 'lodash';
import { addSaved, removeSaved } from '../actions';

const Article = (props) => {
  const stories = useSelector((state) => state.articles);
  const savedStories = useSelector((state) => state.saved);
  const thisURL = window.location.href;
  const id = parseInt(thisURL.substring(thisURL.lastIndexOf('/') + 1));
  const thisArticle = _.find(stories, (element) => element.id === id);
  const dispatch = useDispatch();
  console.log(thisArticle);

  const handleSaveClick = () => {
    if (Object.hasOwn(savedStories, thisArticle.id)) {
      dispatch(removeSaved(thisArticle));
    } else {
      dispatch(addSaved(thisArticle));
    }
  };

  return (
    <div>
      <div className="sidebar-left">
        <h5 className="back-button">
          <Link to="/">Back</Link>
        </h5>
        <button type="button" className="highlight-button btn btn-warning">
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
        />
      </div>
    </div>
  );
};

export default Article;
