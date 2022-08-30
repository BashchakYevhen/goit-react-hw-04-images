import axios from 'axios';
import Axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '28417752-d5982fc4557f983ae3969af04';

export function updateFetch(q, page) {
  return Axios.get(`?key=${KEY}&q=${q}&page=${page}`);
}
