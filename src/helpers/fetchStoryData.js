import { extract } from 'article-parser';
import axios from 'axios';
import { FETCH_STORIES } from '../actions';

export const fetchStories = async (query) => {
  // const results = await axios.get(
  //   `https://newsapi.org/v2/everything?q=${query}&pageSize=5&apiKey=6f455332142e46d88daddea6d559b104`
  // );
  const results = await axios.get('./data.json');
  const { articles } = results.data;
  const formattedData = await formatData(articles);
  return formattedData;
};

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

function extractHTML(data) {
  return data.map((i) => extract(i).then((article) => article.content));
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

async function getReadingLevelInfo(stories, wordList) {
  const storiesDifficulty = [];
  stories.forEach((j) => {
    const splitStory = j
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
      {
        beginner: 0,
        intermediate: 0,
        advanced: 0,
        super: 0,
        total: filteredStory.length + 1,
      }
    );
    storiesDifficulty.push(wordCount);
  });
  return storiesDifficulty;
}

const formatData = async (articles) => {
  const pulledURLS = pullURLS(articles);
  const extractedArticles = await extractArticles(pulledURLS);
  const wordList = await getWordList();
  const storiesDifficulty = await getReadingLevelInfo(
    extractedArticles,
    wordList
  );
  const promisedHTML = extractHTML(pulledURLS);
  let extractedHTML;
  await Promise.all(promisedHTML).then((data) => {
    extractedHTML = data;
  });
  const storiesWithInfo = storiesDifficulty.reduce((acc, item, index) => {
    acc[Date.parse(articles[index].publishedAt)] = {
      id: Date.parse(articles[index].publishedAt),
      title: articles[index].title,
      author: articles[index].author,
      image: articles[index].urlToImage,
      description: articles[index].description,
      source: articles[index].source.name,
      htmlContent: extractedHTML[index],
      wordCount: storiesDifficulty[index].total,
      beginnerWords: `${Math.floor(
        100 *
          (storiesDifficulty[index].beginner / storiesDifficulty[index].total)
      )}%`,
      intermediateWords: `${Math.floor(
        100 *
          (storiesDifficulty[index].intermediate /
            storiesDifficulty[index].total)
      )}%`,
      advancedWords: `${Math.floor(
        100 *
          (storiesDifficulty[index].advanced / storiesDifficulty[index].total)
      )}%`,
      super: `${Math.floor(
        100 * (storiesDifficulty[index].super / storiesDifficulty[index].total)
      )}%`,
    };
    return acc;
  }, {});
  return storiesWithInfo;
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

// export default reducer;
