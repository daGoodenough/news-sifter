import _ from 'lodash';

const difficulty = '0.7';

const sortStories = (articleData, sort) => {
  const sortDifficulty = sort.difficulty;
  if (sortDifficulty === 'default') {
    console.log('MESSAGE: There is no reading level selected');
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

export default sortStories;
