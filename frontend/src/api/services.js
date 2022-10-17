import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export function getBoard(slug, page){

	const url = `${API_URL}/${slug}/?page=${page}`;
	return axios.get(url).then();

};

export function getThread(slug, id){

	const url = `${API_URL}/${slug}/${id}`;
	return axios.get(url).then();

};

export function postNewPost(slug, data){

	const url = `${API_URL}/${slug}/new_post`;
	//console.log(data);
	return axios.post(url, data, {headers: {"Content-Type": "multipart/form-data"}}).then();
};
