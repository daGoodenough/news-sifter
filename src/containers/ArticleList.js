import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import ArticleListItem from './ArticleListItem';
/* eslint-disable react/prop-types */

const ArticleList = ({ history }) => {
  const stories = useSelector((state) => state.articles);

  const renderArticleListItems = () =>
    _.map(stories, (article, articleId) => (
      <ArticleListItem key={articleId} id={articleId} history={history} />
    ));

  return (
    <div className="search-results-box">
      <table className="table">{renderArticleListItems()}</table>
    </div>
  );
};

export default ArticleList;
