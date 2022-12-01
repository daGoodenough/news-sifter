import _ from 'lodash';

const difficulty = '0.7';

const sortStories = (articleData, sort) => {
  const sortDifficulty = sort.difficulty;
  const sortedByDifficulty = sortByDifficulty(articleData, sortDifficulty);

  const sortByMethod = sort.sortBy;
  const sortedBySortByMethodAndDifficulty = sortBySortByMethod(
    sortedByDifficulty,
    sortByMethod
  );

  return sortedBySortByMethodAndDifficulty;
};

const sortByDifficulty = (articleData, sortDifficulty) => {
  if (sortDifficulty === 'default') {
    return _.map(articleData, (article) => article);
  }

  if (sortDifficulty === 'beginner') {
    return _.filter(
      articleData,
      (article) => article.beginnerWords >= difficulty
    );
  }
  if (sortDifficulty === 'intermediate') {
    return _.filter(
      articleData,
      (article) => article.intermediateWords >= difficulty
    );
  }
  if (sortDifficulty === 'advanced') {
    return _.filter(
      articleData,
      (article) => article.advancedWords >= difficulty
    );
  }
};

const sortBySortByMethod = (articles, sortByMethod) => {
  if (sortByMethod === 'default') {
    return articles;
  }

  if (sortByMethod === 'beginnerToAdvanced') {
    return _.sortBy(
      articles,
      (article) => article.advancedWords - article.beginnerWords
    );
  }

  if (sortByMethod === 'advancedToBeginner') {
    return _.sortBy(
      articles,
      (article) => article.beginnerWords - article.advancedWords
    );
  }
};

export default sortStories;
