export const ADD_STORIES = 'ADD_STORIES';
export const ADD_SAVED = 'ADD_SAVED';
export const ADD_HISTORY = 'ADD_HISTORY';
export const REMOVE_HISTORY = 'REMOVE_HISTORY';
export const REMOVE_SAVED = 'REMOVE_SAVED';
export const DELETE_HISTORY = 'DELETE_HISTORY';
export const CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY';

export function addStories(storiesData) {
  return {
    type: ADD_STORIES,
    payload: storiesData,
  };
}

export function addSaved(savedItem) {
  return {
    type: ADD_SAVED,
    payload: savedItem,
  };
}

export function removeSaved(removedItem) {
  return {
    type: REMOVE_SAVED,
    payload: removedItem,
  };
}

export function addHistory(historyItem) {
  return {
    type: ADD_HISTORY,
    payload: historyItem,
  };
}

export function removeHistory(historyItem) {
  return {
    type: REMOVE_HISTORY,
    payload: historyItem,
  };
}

export function deleteHistory(historyItem) {
  return {
    type: DELETE_HISTORY,
    payload: historyItem,
  };
}

export function changeDifficulty(difficulty) {
  return {
    type: CHANGE_DIFFICULTY,
    payload: difficulty,
  };
}
