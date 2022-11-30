/* eslint-disable default-param-last */
/* eslint-disable no-case-declarations */
import { ADD_STORIES } from '../actions';

const reducer = function (state = [], action) {
  switch (action.type) {
    case ADD_STORIES:
      return action.payload;
    default:
      return state;
  }
};

// const DEFAULT_STATE = {
//   3453: {
//     title: "Article Tile",
//     author: "",
//     image: "image url"
//     textContent: "F"
//     wordCount: 93843
//     beginnerWords: 3828
//     intermediateWords: 393
//     advancedWords: 213
//   }
// }

export default reducer;
