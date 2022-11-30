/* eslint-disable default-param-last */
import { CHANGE_DIFFICULTY } from '../actions';

const DEFAULT_STATE = {
  difficulty: null,
  language: 'english',
  sortBy: null,
};

const sortReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CHANGE_DIFFICULTY:
      debugger;
      return { ...state, difficulty: action.payload };
    default:
      return state;
  }
};

export default sortReducer;
