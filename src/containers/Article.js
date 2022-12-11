/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-useless-escape */
/* eslint-disable no-else-return */

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
  const [articleState, setArticleState] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [dictionaryPosition, setDictionaryPosition] = useState({});
  const addEventListeners = () => {
    const articleWords = document.querySelectorAll('.article-word');
    articleWords.forEach((articleWord) => {
      articleWord.addEventListener('mouseover', () => {
        setIsHovering(true);
        const rect = articleWord.getBoundingClientRect();
        setDictionaryPosition({
          left: rect.left - articleWord.offsetWidth,
          top: rect.top - articleWord.offsetHeight,
        });
      });
      articleWord.addEventListener('mouseout', () => {
        setIsHovering(false);
      });
    });
  };

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

  function highlightAdvanced(arr, article, allWordsArr) {
    const spaced = article
      .replaceAll('<', ' <')
      .replaceAll('>', '> ')
      .replaceAll('—', ' - ');
    const splitUp = spaced.split(' ');
    const highlightedArticle = splitUp.map((i) => {
      if (i.includes('<source')) {
        return `<div class="hide-source">${i}</div>`;
      } else if (arr.includes(i.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ''))) {
        return ` <span class="advanced-words-highlighted article-word"> ${i} </span> `;
      } else if (
        allWordsArr.includes(
          i.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase()
        )
      )
        return `<span class="article-word">${i}</span>`;
      else return i;
    });
    const joined = highlightedArticle.join(' ');
    return joined.replaceAll('<', ' <').replaceAll('>', '> ');
  }

  function highlightIntermediate(arr, article, allWordsArr) {
    const spaced = article
      .replaceAll('<', ' <')
      .replaceAll('>', '> ')
      .replaceAll('—', ' - ');
    const splitUp = spaced.split(' ');
    const highlightedArticle = splitUp.map((i) => {
      if (i.includes('<source')) {
        return `<div class="hide-source">${i}</div>`;
      } else if (arr.includes(i.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ''))) {
        return ` <span class="intermediate-words-highlighted article-word"> ${i} </span> `;
      } else if (
        allWordsArr.includes(
          i.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase()
        )
      )
        return `<span class="article-word">${i}</span>`;
      else return i;
    });
    const joined = highlightedArticle.join(' ');
    return joined.replaceAll('<', ' <').replaceAll('>', '> ');
  }

  function wordArrToList(arr) {
    const newArr = arr.map((i) => `<li>${i}</li>`);
    return newArr.join('');
  }

  function wrapEachWordInSpan(str, arr) {
    const spaced = str
      .replaceAll('<', ' <')
      .replaceAll('>', '> ')
      .replaceAll('—', ' - ');
    const splitUp = spaced.split(' ');
    const wrapped = splitUp.map((i) => {
      if (i.includes('<source')) {
        return `<div class="hide-source">${i}</div>`;
      } else if (
        arr.includes(
          i.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase()
        )
      )
        return `<span class="article-word">${i}</span>`;
      else return i;
    });
    const joined = wrapped.join(' ');
    return joined.replaceAll('<', ' <').replaceAll('>', '> ');
  }

  const articleHTML = wrapEachWordInSpan(
    thisArticle.htmlContent,
    thisArticle.allWordsArr
  );
  addEventListeners();

  const articleHTMLIntermediateHighlighted = highlightIntermediate(
    thisArticle.intermediateWordsArr,
    thisArticle.htmlContent,
    thisArticle.allWordsArr
  );
  const articleHTMLAdvancedHighlighted = highlightAdvanced(
    thisArticle.advancedWordsArr,
    thisArticle.htmlContent,
    thisArticle.allWordsArr
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
        <div
          className="dictionary-box"
          style={{
            display: isHovering === true ? 'block' : 'none',
            position: 'absolute',
            left: `${dictionaryPosition.left}px`,
            top: `${dictionaryPosition.top}px`,
          }}
        />
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
