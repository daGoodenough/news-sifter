import { ADD_SAVED, REMOVE_SAVED } from '../actions';

export function savedReducer(state = {}, action) {
  switch (action.type) {
    case ADD_SAVED:
      state[action.payload.id] = action.payload;
      return state;
    case REMOVE_SAVED:
      delete state[action.payload.id];
      return state;
    default:
      return state;
  }
}
