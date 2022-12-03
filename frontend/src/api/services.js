import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const API_URL = 'http://127.0.0.1/api';
export function postNewPost(slug, data) {
  const url = `${API_URL}/${slug}/new_post`;
  return axios.post(url, data, { headers: { 'Content-Type': 'application/json' } });
}

export function postFile(data) {
  const url = `${API_URL}/file_upload/`;
  return axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } });
}

export function getConfigData() {
  const url = `${API_URL}/config`;
  return axios.get(url);
}

export function getNewsData() {
  const url = `${API_URL}/news`;
  return axios.get(url);
}

export function getCategoriesData() {
  const url = `${API_URL}/categories`;
  return axios.get(url);
}

export function getBoardData(slug, page) {
  const url = `${API_URL}/${slug}/?page=${page}`;
  return axios.get(url);
}

export function getThreadData(slug, id) {
  const url = `${API_URL}/${slug}/${id}`;
  return axios.get(url);
}
