import { ADD_HISTORY, DELETE_HISTORY, REMOVE_HISTORY } from '../actions';

export function historyReducer(state = {}, action) {
  switch (action.type) {
    case ADD_HISTORY:
      state[action.payload.id] = action.payload;
      return state;
    case REMOVE_HISTORY:
      delete state[action.payload.id];
      return state;
    case DELETE_HISTORY:
      return {};
    default:
      return state;
  }
}
