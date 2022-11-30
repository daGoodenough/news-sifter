import { combineReducers } from 'redux';
import articleReducer from './articleReducer';
import savedReducer from './savedReducer';
import historyReducer from './historyReducer';

const rootReducer = combineReducers({
  articles: articleReducer,
  saved: savedReducer,
  history: historyReducer,
});

export default rootReducer;
