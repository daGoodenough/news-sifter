import { combineReducers } from 'redux';
import articleReducer from './articleReducer';
import readLaterReducer from './readLaterReducer';
import historyReducer from './historyReducer';

const rootReducer = combineReducers({
  articles: articleReducer,
  readLater: readLaterReducer,
  history: historyReducer,
});

export default rootReducer;
