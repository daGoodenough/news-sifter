export const ADD_STORIES = 'ADD_STORIES';

export function addStories(storiesData) {
  return {
    type: ADD_STORIES,
    payload: storiesData,
  };
}
