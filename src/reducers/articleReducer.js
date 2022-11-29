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

// word list
async function getWordList() {
  const lemmas = [];
  const lemRanks = [];
  const wordForms = [];
  const response = await fetch('wordForms.csv');
  const data = await response.text();
  const table = data.split(/\r?\n/).slice(1);
  table.forEach((row) => {
    const columns = row.split(',');
    const lemRank = columns[0];
    const lemma = columns[1];
    const wordForm = columns[5];
    lemRanks.push(parseFloat(lemRank));
    lemmas.push(lemma);
    wordForms.push(wordForm);
  });
  const wordList = {};
  wordList.lemmas = lemmas;
  wordList.lemRanks = lemRanks;
  wordList.wordForms = wordForms;
  console.log(wordList);
}

async function getReadingLevelInfo(story) {
  console.log('this doesnt work either', story[0]);
}

const reducer = function (state = [], action) {
  switch (action.type) {
    case FETCH_STORIES:
      const pulledURLS = pullURLS(action.payload);
      const extractedArticles = extractArticles(pulledURLS);
      console.log('why does this work', extractedArticles);
      console.log('but this doesnt', extractedArticles[0]);
      getReadingLevelInfo(extractedArticles);
      return extractedArticles;
    default:
      return state;
  }
};

// const DEFAULT_STATE = {
//   3453: {
//     title: "Article Tile",
//     author: "",
//     image: "image url"
//     textContent: "F"
//     wordCount: 93843
//     beginnerWords: 3828
//     intermediateWords: 393
//     advancedWords: 213
//   }
// }

export default reducer;
