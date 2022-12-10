/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-useless-escape */

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';
import { Row, Col } from 'react-bootstrap';
import { addSaved, removeSaved } from '../actions';

const Article = ({ articleLocation }) => {
  const stories = useSelector((state) => state[articleLocation]);
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
          <Button as={Link} to="/" className="back-button">
            Back
          </Button>
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
        return ` <span class="advanced-words-highlighted article-word"> ${i} </span> `;
      }
      return ` <span class="article-word">${i}</span> `;
    });
    const joined = highlightedArticle.join(' ');
    return joined.replaceAll(' <', '<').replaceAll('> ', '>');
  }

  // i could just replace them all with spans around them before the article loads

  function highlightIntermediate(arr, article) {
    const spaced = article
      .replaceAll('<', ' <')
      .replaceAll('>', '> ')
      .replaceAll('—', ', ');
    const splitUp = spaced.split(' ');
    const highlightedArticle = splitUp.map((i) => {
      if (arr.includes(i.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ''))) {
        return ` <span class="intermediate-words-highlighted article-word"> ${i} </span> `;
      }
      return ` <span class="article-word">${i}</span> `;
    });
    const joined = highlightedArticle.join(' ');
    return joined.replaceAll(' <', '<').replaceAll('> ', '>');
  }

  function wordArrToList(arr) {
    const newArr = arr.map((i) => `<li>${i}</li>`);
    return newArr.join('');
  }

  function wrapEachWordInSpan(str) {
    const spaced = str
      .replaceAll('<', ' <')
      .replaceAll('>', '> ')
      .replaceAll('—', ', ');
    console.log(spaced);
    const splitUp = spaced.split(' ');
    const wrapped = splitUp.map(
      (i) =>
        `<span class="article-word">
        ${i}
      </span>`
    );
    const joined = wrapped.join(' ');
    return joined.replaceAll(' <', '<').replaceAll('> ', '>');
  }

  const articleHTML = wrapEachWordInSpan(thisArticle.htmlContent);
  const articleHTMLIntermediateHighlighted = highlightIntermediate(
    thisArticle.intermediateWordsArr,
    thisArticle.htmlContent
  );
  const articleHTMLAdvancedHighlighted = highlightAdvanced(
    thisArticle.advancedWordsArr,
    thisArticle.htmlContent
  );
  const intermediateSidebar = wordArrToList(thisArticle.intermediateWordsArr);
  const advancedSidebar = wordArrToList(thisArticle.advancedWordsArr);

  return (
    <div>
      <div className="sidebar-left">
        <Button as={Link} to="/" className="back-button">
          Back
        </Button>
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
            __html: intermediateSidebar,
          }}
          style={{
            display: isIntermediateHighlighted === true ? 'block' : 'none',
          }}
        />
        <ul
          className="sidebar-advanced-word-list"
          dangerouslySetInnerHTML={{
            __html: advancedSidebar,
          }}
          style={{
            display: isAdvancedHighlighted === true ? 'block' : 'none',
          }}
        />
      </div>

      {Object.hasOwn(savedStories, thisArticle.id) ? (
        <Button onClick={handleSaveClick} className="save-button saved">
          Saved
        </Button>
      ) : (
        <Button onClick={handleSaveClick} className="save-button">
          Save
        </Button>
      )}
      <div className="article-box">
        <h2>{thisArticle.title}</h2>
        <a href={thisArticle.url}>{thisArticle.url}</a>
        <div className="title-and-author">
          <h6>{thisArticle.author} | </h6> <h6> {thisArticle.source}</h6>
        </div>
        <article
          dangerouslySetInnerHTML={{
            __html: articleHTML,
          }}
          style={{
            display:
              isAdvancedHighlighted || isIntermediateHighlighted === true
                ? 'none'
                : 'block',
          }}
        />
        <article
          dangerouslySetInnerHTML={{
            __html: articleHTMLAdvancedHighlighted,
          }}
          style={{
            display: isAdvancedHighlighted === true ? 'block' : 'none',
          }}
        />
        <article
          dangerouslySetInnerHTML={{
            __html: articleHTMLIntermediateHighlighted,
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
