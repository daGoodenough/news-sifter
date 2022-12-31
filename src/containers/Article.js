/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-useless-escape */
/* eslint-disable no-else-return */
/* eslint-disable react/jsx-no-bind */

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import parse from 'html-react-parser';
import Reverso from 'reverso-api';
import { addSaved, removeSaved } from '../actions';
import { NoneHighlighted } from './ArticleTextElements/NoneHighlighted';
import { AdvancedHighlighted } from './ArticleTextElements/AdvancedHighlighted';
import { IntermediateHighlighted } from './ArticleTextElements/IntermediateHighlighted';
import { BothHighlighted } from './ArticleTextElements/BothHighlighted';

const Article = ({ articleLocation }) => {
  const reverso = new Reverso();
  const stories = useSelector((state) => state[articleLocation]);
  const savedStories = useSelector((state) => state.saved);
  const thisURL = window.location.href;
  const id = parseInt(thisURL.substring(thisURL.lastIndexOf('/') + 1));
  const thisArticle = _.find(stories, (element) => element.id === id);
  const dispatch = useDispatch();
  const [isAdvancedHighlighted, setIsAdvancedHighlighted] = useState(false);
  const [isIntermediateHighlighted, setIsIntermediateHighlighted] =
    useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [dictionaryPosition, setDictionaryPosition] = useState({});
  const [translations, setTranslations] = useState('');
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');
  const [supportedLanguages, setSupportedLanguages] = useState(null);

  const authKey = '289916f3-fce1-fe01-b0e0-c97df35cbc8a:fx';
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsHovering(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    const getSupportedLanguages = async () => {
      const res = await axios.get(
        `https://api-free.deepl.com/v2/languages?auth_key=${authKey}`
      );
      setSupportedLanguages(res.data);
    };
    getSupportedLanguages();
  }, []);

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

  const getDefinition = async (word) => {
    const res = await axios.get(
      `https://api-free.deepl.com/v2/translate?auth_key=${authKey}&text=${word}&target_lang=PT-BR`
    );
    setTranslations(res?.data?.translations[0].text);
  };

  const getContext = async (word) => {
    const res = await reverso.getContext(word, 'portuguese', 'english');
    const sentences = res.examples;
    const shortest = sentences.reduce((a, b) =>
      a.source.length <= b.source.length ? a : b
    );
    console.log('shortest', shortest);
    setSource(shortest.source);
    setTarget(shortest.target);
  };

  const handleSaveClick = () => {
    if (Object.hasOwn(savedStories, thisArticle.id)) {
      dispatch(removeSaved(thisArticle));
    } else {
      dispatch(addSaved(thisArticle));
    }
  };

  const handleHighlightAdvancedClick = () => {
    if (isAdvancedHighlighted) {
      setIsAdvancedHighlighted(false);
    } else {
      setIsAdvancedHighlighted(true);
    }
  };

  const handleHighlightIntermediateClick = () => {
    if (isIntermediateHighlighted) {
      setIsIntermediateHighlighted(false);
    } else {
      setIsIntermediateHighlighted(true);
    }
  };

  function wordArrToList(arr) {
    const newArr = arr.map((i) => `<li>${i}</li>`);
    return newArr.join('');
  }

  function handleWordClick(e) {
    if (isHovering) {
      setIsHovering(false);
    } else {
      setIsHovering(true);
      const rectX = e.clientX;
      const rectY = e.clientY;
      const word = e.target.innerHTML
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()“”"″]/g, '')
        .trim();
      getDefinition(word);
      getContext(word);
      setDictionaryPosition({
        left: rectX - 100,
        top: rectY + window.scrollY - 280,
      });
    }
  }

  function wrapEachWordInSpan(str, arr, intermediateArr, advancedArr) {
    const spaced = str
      .replaceAll('<', ' <')
      .replaceAll('>', '> ')
      .replaceAll('—', ' - ');
    const splitUp = spaced.split(' ');
    const wrapped = splitUp.map((i) => {
      const cleanWord = i
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()“”"″]/g, '')
        .toLowerCase();
      if (i.includes('<source')) {
        return `<div class="hide-source">${i}</div>`;
      } else if (intermediateArr.includes(cleanWord)) {
        return ` <span class="intermediate article-word">${i}</span> `;
      } else if (advancedArr.includes(cleanWord)) {
        return ` <span class="advanced article-word">${i}</span> `;
      } else if (arr.includes(cleanWord))
        return `<span class="article-word">${i}</span>`;
      else return i;
    });

    const joined = wrapped.join(' ');
    return joined.replaceAll('<', ' <').replaceAll('>', '> ');
  }

  const htmlToParse = wrapEachWordInSpan(
    thisArticle.htmlContent,
    thisArticle.allWordsArr,
    thisArticle.intermediateWordsArr,
    thisArticle.advancedWordsArr
  );

  const intermediateSidebar = wordArrToList(thisArticle.intermediateWordsArr);
  const advancedSidebar = wordArrToList(thisArticle.advancedWordsArr);
  const intermediateSidebarJSX = parse(intermediateSidebar);
  const advancedSidebarJSX = parse(advancedSidebar);

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
          style={{
            display: isIntermediateHighlighted === true ? 'block' : 'none',
          }}
        >
          {intermediateSidebarJSX}
        </ul>
        <ul
          className="sidebar-advanced-word-list"
          style={{
            display: isAdvancedHighlighted === true ? 'block' : 'none',
          }}
        >
          {advancedSidebarJSX}
        </ul>
      </div>

      {Object.hasOwn(savedStories, thisArticle?.id) ? (
        <Button onClick={handleSaveClick} className="save-button saved">
          Saved
        </Button>
      ) : (
        <Button onClick={handleSaveClick} className="save-button">
          Save
        </Button>
      )}
      <div className="article-box">
        <h2>{thisArticle?.title}</h2>
        <a href={thisArticle?.url}>{thisArticle?.url}</a>
        <div className="title-and-author">
          <h6>{thisArticle?.author} | </h6> <h6> {thisArticle?.source}</h6>
        </div>
        <div
          className="dictionary-box"
          ref={ref}
          style={{
            display: isHovering === true ? 'block' : 'none',
            position: 'absolute',
            left: `${dictionaryPosition.left}px`,
            top: `${dictionaryPosition.top}px`,
          }}
        >
          <h3>{translations}</h3>
          <p>{source}</p>
          <p> {target}</p>
        </div>
        <div>
          {isAdvancedHighlighted === false &&
          isIntermediateHighlighted === false ? (
            <NoneHighlighted
              htmlToParse={htmlToParse}
              handleWordClick={handleWordClick}
            />
          ) : null}
        </div>
        <div>
          {isAdvancedHighlighted === false &&
          isIntermediateHighlighted === true ? (
            <IntermediateHighlighted
              htmlToParse={htmlToParse}
              handleWordClick={handleWordClick}
            />
          ) : null}
        </div>
        <div>
          {isAdvancedHighlighted === true &&
          isIntermediateHighlighted === false ? (
            <AdvancedHighlighted
              htmlToParse={htmlToParse}
              handleWordClick={handleWordClick}
            />
          ) : null}
        </div>
        <div>
          {isAdvancedHighlighted === true &&
          isIntermediateHighlighted === true ? (
            <BothHighlighted
              htmlToParse={htmlToParse}
              handleWordClick={handleWordClick}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Article;
