import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import ArticleListItem from './ArticleListItem';

const ArticleList = () => {
  const stories = useSelector((state) => state.articles);

  const renderArticleListItems = () =>
    _.map(stories, (article, articleId) => (
      <ArticleListItem key={articleId} id={articleId} />
    ));

  return <table className="table">{renderArticleListItems()}</table>;
};

export default ArticleList;
