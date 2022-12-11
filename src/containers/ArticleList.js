import React from 'react';
import { useSelector } from 'react-redux';

import ArticleListItem from './ArticleListItem';
import sortArticles from '../helpers/sortArticleData';
import ErrorPage from '../components/ErrorPage';
/* eslint-disable react/prop-types */

const ArticleList = ({ history }) => {
  const stories = useSelector((state) => state.articles);
  const sort = useSelector((state) => state.sort);
  if (!stories) {
    return <ErrorPage />;
  }

  const sortedArticles = sortArticles(stories, sort);

  const renderArticleListItems = () =>
    sortedArticles.map((article) => (
      <ArticleListItem history={history} key={article.id} id={article.id} />
    ));

  return (
    <div className="search-results-box">
      <table className="table">{renderArticleListItems()}</table>
    </div>
  );
};

export default ArticleList;
