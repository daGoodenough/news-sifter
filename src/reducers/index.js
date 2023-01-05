import { combineReducers } from 'redux';
import articleReducer from './articleReducer';
import savedReducer from './savedReducer';
import historyReducer from './historyReducer';
import sortReducer from './sortReducer';
import translatorReducer from './translatorReducer';

const rootReducer = combineReducers({
  articles: articleReducer,
  saved: savedReducer,
  history: historyReducer,
  sort: sortReducer,
  translator: translatorReducer,
});

export default rootReducer;
