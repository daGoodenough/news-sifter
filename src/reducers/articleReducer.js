import { extract } from 'article-parser';
import { FETCH_STORIES } from '../actions';

function pullURLS(data) {
  const pulled = data.map((i) => i.url);
  return pulled;
}

function extractArticles(data, extractedArticles) {
  extractedArticles = [];
  data.forEach((i) => {
    extract(i).then((article) => {
      const content = article.content.replaceAll('<', ' <');
      const parser = new DOMParser();
      const parsedArticle = parser.parseFromString(content, 'text/html');
      extractedArticles.push(parsedArticle.all[0].textContent);
    });
  });
  return extractedArticles;
}

const DEFAULT_STATE = {
  3453: {
    title: "Article Tile",
    author: "",
    image: "image url"
    textContent: "F"
    wordCount: 93843
    beginnerWords: 3828
    intermediateWords: 393
    advancedWords: 213
  }
}

const reducer = function (state = [], action) {
  switch (action.type) {
    case FETCH_STORIES:
      console.log('payload', action.payload);
      const pulledURLS = pullURLS(action.payload);
      console.log('urls', pulledURLS);
      const extractedArticles = extractArticles(pulledURLS);
      return extractedArticles;
    default:
      return state;
  }
};

export default reducer;
