import _ from 'lodash';

const high = 0.2;
const low = 0.1;

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
    return _.filter(articleData, (article) => article.advancedWords <= low);
  }
  if (sortDifficulty === 'intermediate') {
    return _.filter(
      articleData,
      (article) => article.advancedWords > low && article.advancedWords < high
    );
  }
  if (sortDifficulty === 'advanced') {
    return _.filter(articleData, (article) => article.advancedWords >= high);
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
