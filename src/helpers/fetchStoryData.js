import { extract } from 'article-parser';
import axios from 'axios';
import { FETCH_STORIES } from '../actions';

export const fetchStories = async (query, wordList) => {
  // const results = await axios.get(
  //   `https://newsapi.org/v2/everything?q=${query}&pageSize=5&apiKey=6f455332142e46d88daddea6d559b104`
  // );
  const results = await axios.get('./data.json');
  const { articles } = results.data;
  const formattedData = await formatData(articles, wordList);
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

const formatData = async (articles, wordList) => {
  const pulledURLS = pullURLS(articles);
  const extractedArticles = await extractArticles(pulledURLS);
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
  const notPromiesed = storiesWithInfo;
  return notPromiesed;
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
