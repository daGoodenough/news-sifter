import React from 'react';
import { useSelector } from 'react-redux';
import ArticleListItem from './ArticleListItem';

const ArticleList = () => {
  const stories = useSelector((state) => state.articles);
  // console.log('stories', stories);
  const articles = stories.then((resolved) => resolved);

  // const articles = getData();
  // console.log('Articles', articles);

  const renderArticleListItems = async () => {
    const articles = stories.then((resolved) => resolved);
    console.log('Articles', await articles);
    const articleListItems = [];
    for (const article in await articles) {
      articleListItems.push(<ArticleListItem key={article} id={article} />);
    }
    // const articleListItems = await articles.map((article, index) => {
    //   // return <ArticleListItem key={} />
    // });
    return articleListItems;
  };

  renderArticleListItems().then((resolved) => resolved);

  // console.log('Article list Items', resolvedArticleListItems);
  // map through the articles in the store
  // return <ArticleListItem id={articleId} key={index}/>

  return (
    <>
      <ArticleListItem />
      {/* {renderArticleListItems()} */}
    </>
  );
};

export default ArticleList;
