import React from 'react';
<<<<<<< HEAD
import { useSelector } from 'react-redux';
import _ from 'lodash';
import ArticleListItem from '../containers/ArticleListItem';

const Saved = () => {
  const stories = useSelector((state) => state.saved);

  const renderArticleListItems = () =>
    _.map(stories, (article, articleId) => (
      <ArticleListItem key={articleId} id={articleId} />
    ));

  return <table className="table">{renderArticleListItems()}</table>;
};
=======

const Saved = () => <div>Saved</div>;
>>>>>>> 32047ea (replaces nav dropdowns with nav links to history and saved pages)

export default Saved;
