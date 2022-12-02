/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { deleteSaved } from '../actions';
import SavedListItem from './SavedListItem';

const Saved = ({ history }) => {
  const stories = useSelector((state) => state.saved);

  const renderSavedListItems = () =>
    _.map(stories, (article, articleId) => (
      <SavedListItem key={articleId} id={articleId} history={history} />
    ));

  const dispatch = useDispatch();

  const deleteHandler = () => dispatch(deleteSaved());

  return (
    <>
      <h5 className="back-button">
        <Link to="/">Back</Link>
      </h5>
      {_.isEmpty(stories) ? (
        <h5 className="history-message">No saved articles...</h5>
      ) : (
        <button
          className="clear-history-button"
          type="button"
          onClick={deleteHandler}
        >
          Clear Saved
        </button>
      )}
      <div className="search-results-box">
        <table className="table">{renderSavedListItems()}</table>
      </div>
    </>
  );
};

export default Saved;
