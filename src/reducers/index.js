import { combineReducers } from 'redux';
import articleReducer from './articleReducer';
import savedReducer from './savedReducer';
import historyReducer from './historyReducer';
import sortReducer from './sortReducer';

const rootReducer = combineReducers({
  articles: articleReducer,
  saved: savedReducer,
  history: historyReducer,
  sort: sortReducer,
});

export default rootReducer;
