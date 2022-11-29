import React from 'react';
import ArticleListItem from './ArticleListItem';

const ArticleList = () => {
  const renderArticleListItems = () => {
    // map through the articles in the store
    // return <ArticleListItem id={articleId} key={index}/>
  };

  return (
    <>
      <ArticleListItem />
      {/* {renderArticleListItems()} */}
    </>
  );
};

export default ArticleList;
