/* eslint-disable default-param-last */
import { SET_TRANSLATOR } from '../actions';

const translatorReducer = (
  state = { translator: 'PT', language: 'Portuguese' },
  action
) => {
  switch (action.type) {
    case SET_TRANSLATOR:
      return {
        translator: action.payload.translator,
        language: action.payload.language,
      };
    default:
      return state;
  }
};

export default translatorReducer;
