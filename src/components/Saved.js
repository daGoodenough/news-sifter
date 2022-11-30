import React from 'react';
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

export default Saved;
