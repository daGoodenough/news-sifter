/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-useless-escape */
/* eslint-disable no-else-return */

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import parse, { domToReact, attributesToProps } from 'html-react-parser';
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
  const [isHovering, setIsHovering] = useState(false);
  const [dictionaryPosition, setDictionaryPosition] = useState({});
  const [translations, setTranslations] = useState([]);

  // const initialLoad = async () => {
  //   const test = await articleHTML;
  //   console.log('test', test);

  // };
  // useEffect(() => {
  //   initialLoad();
  // }, []);

  const authKey = '289916f3-fce1-fe01-b0e0-c97df35cbc8a:fx';

  const getDefinition = async (word) => {
    const res = await axios.get(
      `https://api-free.deepl.com/v2/translate?auth_key=${authKey}&text=${word}&target_lang=DE`
    );
    setTranslations(res.data.translations);
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
  const intermediateWords = document.querySelectorAll(
    '.intermediate-words-highlighted'
  );
  const advancedWords = document.querySelectorAll(
    '.advanced-words-highlighted'
  );
  const handleHighlightAdvancedClick = () => {
    if (isAdvancedHighlighted) {
      setIsAdvancedHighlighted(false);
      advancedWords.forEach((word) =>
        word.classList.remove('adv-highlight-on')
      );
    } else {
      setIsAdvancedHighlighted(true);
      setIsIntermediateHighlighted(false);
      advancedWords.forEach((word) => word.classList.add('adv-highlight-on'));
      intermediateWords.forEach((word) =>
        word.classList.remove('inter-highlight-on')
      );
    }
  };

  const handleHighlightIntermediateClick = () => {
    if (isIntermediateHighlighted) {
      setIsIntermediateHighlighted(false);
      intermediateWords.forEach((word) =>
        word.classList.remove('inter-highlight-on')
      );
    } else {
      setIsIntermediateHighlighted(true);
      setIsAdvancedHighlighted(false);
      intermediateWords.forEach((word) =>
        word.classList.add('inter-highlight-on')
      );
      advancedWords.forEach((word) =>
        word.classList.remove('adv-highlight-on')
      );
    }
  };

  function wordArrToList(arr) {
    const newArr = arr.map((i) => `<li>${i}</li>`);
    return newArr.join('');
  }

  function handleMouseEnter(e) {
    console.log('hello', e);
    const rectX = e.clientX;
    const rectY = e.clientY;
    const word = e.target.innerHTML
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()“”"″]/g, '')
      .trim();
    setIsHovering(true);
    getDefinition(word);
    setDictionaryPosition({
      left: rectX - 100,
      top: rectY + window.scrollY - 260,
    });
  }

  function handleMouseOut() {
    setIsHovering(false);
  }

  function wrapEachWordInSpan(str, arr, intermediateArr, advancedArr) {
    const spaced = str
      .replaceAll('<', ' <')
      .replaceAll('>', '> ')
      .replaceAll('—', ' - ');
    const splitUp = spaced.split(' ');
    const wrapped = splitUp.map((i) => {
      if (i.includes('<source')) {
        return `<div class="hide-source">${i}</div>`;
      } else if (
        intermediateArr.includes(
          i.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()“”"″]/g, '')
        )
      ) {
        return ` <span class="intermediate-words-highlighted article-word"> ${i} </span> `;
      } else if (
        advancedArr.includes(i.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()“”"″]/g, ''))
      ) {
        return ` <span class="advanced-words-highlighted article-word"> ${i} </span> `;
      } else if (
        arr.includes(
          i.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()“”"″]/g, '').toLowerCase()
        )
      )
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

  const reactElements = parse(htmlToParse, {
    replace: (node, index) => {
      if (node?.attribs?.class) {
        const classNames = node.attribs.class.split(' ');
        if (
          classNames.some((className) => className.includes('article-word'))
        ) {
          return (
            <span
              className={node.attribs.class}
              onMouseEnter={(e) => handleMouseEnter(e)}
              onMouseLeave={() => handleMouseOut()}
            >
              {node.children.map((child) => child.data).join('')}
            </span>
          );
        }
      }
      return node;
    },
  });

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
          style={{
            display: isHovering === true ? 'block' : 'none',
            position: 'absolute',
            left: `${dictionaryPosition.left}px`,
            top: `${dictionaryPosition.top}px`,
          }}
        >
          <span>
            {translations.map((i) => (
              <span>{i.text}</span>
            ))}
          </span>
        </div>
        {/* <article
          dangerouslySetInnerHTML={{
            __html: articleHTML,
          }}
        /> */}
        <div>{reactElements}</div>
      </div>
    </div>
  );
};

export default Article;
