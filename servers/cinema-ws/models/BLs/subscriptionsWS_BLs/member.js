const axios = require("axios");
<<<<<<< HEAD
const URL = "http://localhost:8000/members/";
=======
const URL = "http://subscriptions-ws.herokuapp.com/members/";
>>>>>>> 6072eb5aa7d8ad6d6f4ee982cdc94da7df57a0a1

const getAll = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let resp = await axios.get(URL);
			resolve(resp.data);
		} catch (err) {
			reject(err);
		}
	});
};

<<<<<<< HEAD
const getById = id => {
=======
const getById = (id) => {
>>>>>>> 6072eb5aa7d8ad6d6f4ee982cdc94da7df57a0a1
	return new Promise(async (resolve, reject) => {
		try {
			let resp = await axios.get(URL + id);
			if (resp.data) {
				resolve(resp.data);
			}
			reject("No Data");
		} catch (err) {
			reject(err);
		}
	});
};

<<<<<<< HEAD
const addNew = newData => {
=======
const addNew = (newData) => {
>>>>>>> 6072eb5aa7d8ad6d6f4ee982cdc94da7df57a0a1
	return new Promise(async (resolve, reject) => {
		try {
			let resp = await axios.post(URL, newData);
			if (resp.data) {
				resolve(resp.data);
			}
			reject("Error");
		} catch (err) {
			reject(err);
		}
	});
};

const updateById = (id, updatedData) => {
	return new Promise(async (resolve, reject) => {
		try {
			let resp = await axios.patch(URL + id, updatedData);
			if (resp.data) {
				resolve(resp.data);
			}
			reject("Error");
		} catch (err) {
			reject(err);
		}
	});
};

<<<<<<< HEAD
const deleteById = id => {
=======
const deleteById = (id) => {
>>>>>>> 6072eb5aa7d8ad6d6f4ee982cdc94da7df57a0a1
	return new Promise(async (resolve, reject) => {
		try {
			let resp = await axios.delete(URL + id);
			if (resp.data) {
				resolve(resp.data);
			}
			reject("Error");
		} catch (err) {
			reject(err);
		}
	});
};

module.exports = { getAll, getById, addNew, updateById, deleteById };
