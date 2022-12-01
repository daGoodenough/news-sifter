/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import SavedListItem from './SavedListItem';

const Saved = ({ history }) => {
  const stories = useSelector((state) => state.saved);

  const renderSavedListItems = () =>
    _.map(stories, (article, articleId) => (
      <SavedListItem key={articleId} id={articleId} history={history} />
    ));

  return (
    <>
      {_.isEmpty(stories) ? (
        <h5 className="history-message">No saved articles...</h5>
      ) : (
        <div className="search-results-box">
          <table className="table">{renderSavedListItems()}</table>
        </div>
      )}
    </>
  );
};

export default Saved;
