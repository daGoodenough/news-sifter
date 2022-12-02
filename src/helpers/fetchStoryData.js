import { extract } from 'article-parser';
import axios from 'axios';
/* eslint-disable no-useless-escape */
/* eslint-disable no-shadow */
/* eslint-disable array-callback-return */

const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchStories = async (query, wordList, cocaWords) => {
  // const results = await axios.get(
  //   `https://newsapi.org/v2/everything?q=${query}&pageSize=100&apiKey=${API_KEY}`
  // );
  const results = await axios.get('./data.json');
  const { articles } = results.data;
  const formattedData = await formatData(articles, wordList, cocaWords);
  console.log('Formatted: ', formattedData);
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

async function getReadingLevelInfo(stories, wordList, cocaWords) {
  const storiesDifficulty = [];
  stories.forEach((j) => {
    const splitStory = j
      .toLowerCase()
      .trim()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    const noHyphens = splitStory.replaceAll('—', ' ').split(' ');
    const filteredStory = noHyphens.filter((el) => el !== '');
    const [beginnerRank, intermediateRank, tooAdvancedRank] = [
      2000, 10000, 30000,
    ];
    const wordCount = filteredStory.reduce(
      (acc, i) => {
        if (wordList.wordForms.includes(i)) {
          const index = wordList.wordForms.indexOf(i);
          if (cocaWords.includes(wordList.lemmas[index])) {
            if (index <= beginnerRank) {
              acc.beginner += 1;
            } else if (index <= intermediateRank) {
              acc.intermediate += 1;
            } else if (index >= intermediateRank && index <= tooAdvancedRank) {
              acc.advanced += 1;
              if (!acc?.wordsToShow.includes(wordList.wordForms[index])) {
                acc.wordsToShow.push(wordList.wordForms[index]);
              }
            }
          }
        }
        return acc;
      },
      {
        beginner: 0,
        intermediate: 0,
        advanced: 0,
        wordsToShow: [],
        total: filteredStory.length + 1,
      }
    );
    storiesDifficulty.push(wordCount);
  });
  return storiesDifficulty;
}

const formatData = async (articles, wordList, cocaWords) => {
  console.log('wordList', wordList);
  console.log('cocaWords', cocaWords);
  const pulledURLS = pullURLS(articles);
  const extractedArticles = await extractArticles(pulledURLS);
  const storiesDifficulty = await getReadingLevelInfo(
    extractedArticles,
    wordList,
    cocaWords
  );
  const promisedHTML = extractHTML(pulledURLS);
  let extractedHTML;
  await Promise.all(promisedHTML).then((data) => {
    extractedHTML = data;
  });
  const storiesWithInfo = storiesDifficulty.reduce((acc, item, index) => {
    acc[Date.parse(articles[index].publishedAt)] = {
      id: Date.parse(articles[index].publishedAt),
      url: articles[index].url,
      title: articles[index].title,
      author: articles[index].author,
      image: articles[index].urlToImage,
      description: articles[index].description,
      source: articles[index].source.name,
      htmlContent: extractedHTML[index],
      wordsToShow: storiesDifficulty[index].wordsToShow.join(', '),
      wordCount: storiesDifficulty[index].total,
      beginnerWords:
        storiesDifficulty[index].beginner / storiesDifficulty[index].total,
      intermediateWords:
        storiesDifficulty[index].intermediate / storiesDifficulty[index].total,
      advancedWords:
        storiesDifficulty[index].advanced / storiesDifficulty[index].total,
      super: storiesDifficulty[index].super / storiesDifficulty[index].total,
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
