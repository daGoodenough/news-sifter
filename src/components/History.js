import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import HistoryListItem from '../containers/HistoryListItem';
import { deleteHistory } from '../actions';

const History = ({ history }) => {
  const stories = useSelector((state) => state.history);

  console.log('useSelector: ', useSelector);

  console.log('Stories: ', stories);

  const renderArticleListItems = () =>
    _.map(stories, (article, articleId) => (
      <HistoryListItem key={articleId} id={articleId} history={history} />
    ));

  const dispatch = useDispatch();

  const deleteHandler = () => dispatch(deleteHistory());

  return (
    <div>
      <table className="table">{renderArticleListItems()}</table>
      <button type="button" onClick={deleteHandler}>
        Clear History
      </button>
    </div>
  );
};

export default History;
