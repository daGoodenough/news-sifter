export const ADD_STORIES = 'ADD_STORIES';
export const CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const CHANGE_SORTBY = 'CHANGE_SORTBY';

export function addStories(storiesData) {
  return {
    type: ADD_STORIES,
    payload: storiesData,
  };
}

export function changeDifficulty(difficulty) {
  return {
    type: CHANGE_DIFFICULTY,
    payload: difficulty,
  };
}

export function changeLanguage(language) {
  return {
    type: CHANGE_LANGUAGE,
    payload: language,
  };
}

export function changeSortBy(sortBy) {
  return {
    type: CHANGE_SORTBY,
    payload: sortBy,
  };
}
