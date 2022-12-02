/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-useless-escape */

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';

import _ from 'lodash';
import { Row, Col } from 'react-bootstrap';
import { addSaved, removeSaved } from '../actions';

const Article = () => {
  const stories = useSelector((state) => state.articles);
  const savedStories = useSelector((state) => state.saved);
  const thisURL = window.location.href;
  const id = parseInt(thisURL.substring(thisURL.lastIndexOf('/') + 1));
  const thisArticle = _.find(stories, (element) => element.id === id);
  const dispatch = useDispatch();

  const [isAdvancedHighlighted, setIsAdvancedHighlighted] = useState(false);
  const [isIntermediateHighlighted, setIsIntermediateHighlighted] =
    useState(false);

  if (thisArticle === undefined) {
    return (
      <Row>
        <Col>
          <h5 className="back-button">
            <Link to="/">Back</Link>
          </h5>
          <h5 className="missing-article-message">
            This article could not be found...
          </h5>
        </Col>
      </Row>
    );
  }

  const handleSaveClick = () => {
    if (Object.hasOwn(savedStories, thisArticle.id)) {
      dispatch(removeSaved(thisArticle));
    } else {
      dispatch(addSaved(thisArticle));
    }
  };

  const handleHighlightAdvancedClick = () => {
    if (isAdvancedHighlighted) setIsAdvancedHighlighted(false);
    else {
      setIsAdvancedHighlighted(true);
      setIsIntermediateHighlighted(false);
    }
  };

  const handleHighlightIntermediateClick = () => {
    if (isIntermediateHighlighted) setIsIntermediateHighlighted(false);
    else {
      setIsIntermediateHighlighted(true);
      setIsAdvancedHighlighted(false);
    }
  };

  function highlightAdvanced(arr, article) {
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

  function highlightIntermediate(arr, article) {
    const spaced = article
      .replaceAll('<', ' <')
      .replaceAll('>', '> ')
      .replaceAll('—', ', ');
    const splitUp = spaced.split(' ');
    const highlightedArticle = splitUp.map((i) => {
      if (arr.includes(i.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ''))) {
        return ` <span class="intermediate-words-highlighted"> ${i} </span> `;
      }
      return i;
    });
    const joined = highlightedArticle.join(' ');
    return joined.replaceAll(' <', '<').replaceAll('> ', '>');
  }

  function wordArrToList(arr) {
    const newArr = arr.map((i) => `<li>${i}</li>`);
    return newArr.join('');
  }

  return (
    <div>
      <div className="sidebar-left">
        <h5 className="back-button">
          <Link to="/">Back</Link>
        </h5>
        <button
          onClick={handleHighlightIntermediateClick}
          type="button"
          className="highlight-button btn btn-info"
        >
          Highlight Intermediate Words
        </button>
        <button
          onClick={handleHighlightAdvancedClick}
          type="button"
          className="highlight-button btn btn-warning"
        >
          Highlight Advanced Words
        </button>
        <ul
          className="sidebar-intermediate-word-list"
          dangerouslySetInnerHTML={{
            __html: wordArrToList(thisArticle.intermediateWordsArr),
          }}
          style={{
            display: isIntermediateHighlighted === true ? 'block' : 'none',
          }}
        />
        <ul
          className="sidebar-advanced-word-list"
          dangerouslySetInnerHTML={{
            __html: wordArrToList(thisArticle.advancedWordsArr),
          }}
          style={{
            display: isAdvancedHighlighted === true ? 'block' : 'none',
          }}
        />
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
            display:
              isAdvancedHighlighted || isIntermediateHighlighted === true
                ? 'none'
                : 'block',
          }}
        />
        <article
          dangerouslySetInnerHTML={{
            __html: highlightAdvanced(
              thisArticle.advancedWordsArr,
              thisArticle.htmlContent
            ),
          }}
          style={{
            display: isAdvancedHighlighted === true ? 'block' : 'none',
          }}
        />
        <article
          dangerouslySetInnerHTML={{
            __html: highlightIntermediate(
              thisArticle.intermediateWordsArr,
              thisArticle.htmlContent
            ),
          }}
          style={{
            display: isIntermediateHighlighted === true ? 'block' : 'none',
          }}
        />
      </div>
    </div>
  );
};

export default Article;
