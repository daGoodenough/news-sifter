export const ADD_STORIES = 'ADD_STORIES';
export const CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY';

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
