import { ADD_SAVED, REMOVE_SAVED } from '../actions';

export function savedReducer(state = {}, action) {
  switch (action.type) {
    case ADD_SAVED:
      const tempADD = {...state}
      tempADD[action.payload.id] = action.payload;
      return tempADD;
    case REMOVE_SAVED:
      const tempREMOVE = {...state}
      delete tempREMOVE[action.payload.id];
      return tempREMOVE;
    default:
      return state;
  }
}
