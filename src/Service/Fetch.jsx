import Axios from 'axios';

const KEY = '28417752-d5982fc4557f983ae3969af04';
const BASE_URL = 'https://pixabay.com/api/';

export function baseFetch() {
  return Axios.get(`${BASE_URL}?key=${KEY}`);
}
export function updateFetch(q, page) {
  return Axios.get(`${BASE_URL}?key=${KEY}&q=${q}&page=${page}`);
}
