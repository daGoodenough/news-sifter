export const ADD_STORIES = 'ADD_STORIES';

export function addStories(storiesData) {
  console.log('Add stories action called');
  return {
    type: ADD_STORIES,
    payload: storiesData,
  };
}
