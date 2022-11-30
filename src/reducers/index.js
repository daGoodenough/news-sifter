import { combineReducers } from 'redux';
import articleReducer from './articleReducer';
import readLaterReducer from './readLaterReducer';
import historyReducer from './historyReducer';
import sortReducer from './sortReducer';

const rootReducer = combineReducers({
  articles: articleReducer,
  readLater: readLaterReducer,
  history: historyReducer,
  sort: sortReducer,
});

export default rootReducer;
