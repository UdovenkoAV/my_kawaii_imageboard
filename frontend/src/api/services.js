import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export function postNewPost(slug, data) {
  const url = `${API_URL}/${slug}/new_post`;
  return axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } }).then();
}

export function getData(path) {
  const url = `${API_URL}/${path}`;
  return axios.get(url).then();
}
