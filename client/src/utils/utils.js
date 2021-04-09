import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080" });

const getAll = (url) => API.get(url);
const getById = (url, id) => API.get(url + id);
const updateById = (url, id, obj) => API.patch(url + id, obj);
const post = (url, obj) => API.post(url, obj);
const deleteById = (url, id) => API.delete(url + id);

const exportObj = {
	getAll,
	getById,
    post,
	updateById,
    deleteById,
};
export default exportObj;
