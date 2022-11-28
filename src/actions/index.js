import axios from 'axios';

export const FETCH_STORIES = 'FETCH_STORIES';

export async function fetchStories(query) {
  const results = await axios.get(
    `https://newsapi.org/v2/everything?q=${query}&pageSize=5&apiKey=6f455332142e46d88daddea6d559b104`
  );
  return {
    type: FETCH_STORIES,
    payload: results.data.articles,
  };
}