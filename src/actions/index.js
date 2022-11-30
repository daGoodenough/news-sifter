export const FETCH_STORIES = 'FETCH_STORIES';

export async function addStories(storiesData) {
  return {
    type: FETCH_STORIES,
    payload: results.data.articles,
  };
}
