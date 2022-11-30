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
};

export default sortStories;
