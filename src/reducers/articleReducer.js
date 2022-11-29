import { extract } from 'article-parser';
import { FETCH_STORIES } from '../actions';

function pullURLS(data) {
  const pulled = data.map((i) => i.url);
  return pulled;
}

async function extractArticles(data) {
  const extractedArticles = [];
  const articlePromises = await data.map((i) => extract(i));
  await Promise.all(articlePromises).then((data) => {
    data.map((article) => {
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
  return wordList;
}

async function getReadingLevelInfo(story, wordList) {
  const splitStory = story[0]
    .toLowerCase()
    .trim()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
  const noHyphens = splitStory.replaceAll('—', ' ').split(' ');
  const filteredStory = noHyphens.filter((el) => el !== '');
  const wordCount = filteredStory.reduce(
    (acc, i) => {
      if (wordList.wordForms.includes(i)) {
        const index = wordList.wordForms.indexOf(i);
        if (Number(wordList.lemRanks[index]) <= 1000) {
          acc.beginner += 1;
        } else if (Number(wordList.lemRanks[index]) <= 2500) {
          acc.intermediate += 1;
        } else if (Number(wordList.lemRanks[index]) <= 5050) {
          acc.advanced += 1;
        }
      } else {
        acc.super += 1;
      }
      return acc;
    },
    { beginner: 0, intermediate: 0, advanced: 0, super: 0 }
  );
  console.log('splitstory', noHyphens);
  console.log('Word Count', wordCount);
}

const reducer = async function (state = [], action) {
  switch (action.type) {
    case FETCH_STORIES:
      const pulledURLS = pullURLS(action.payload);
      const extractedArticles = await extractArticles(pulledURLS);
      const wordList = await getWordList();
      getReadingLevelInfo(extractedArticles, wordList);
      return action.payload;
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
