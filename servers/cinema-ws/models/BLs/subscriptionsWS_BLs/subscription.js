const axios = require("axios");
const URL = "http://localhost:8000/subscriptions/";

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

const getById = id => {
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

const getByMemberId = id => {
	return new Promise(async (resolve, reject) => {
		try {
			let resp = await axios.get(URL + "members/" + id);
			if (resp.data) {
				resolve(resp.data);
			}
			reject("No Data");
		} catch (err) {
			reject(err);
		}
	});
};

const getByMovieId = id => {
	return new Promise(async (resolve, reject) => {
		try {
			let resp = await axios.get(URL + "movies/" + id);
			if (resp.data) {
				resolve(resp.data);
			}
			reject("No Data");
		} catch (err) {
			reject(err);
		}
	});
};

const addNew = newData => {
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

const deleteById = id => {
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

const deleteByMemberId = id => {
	return new Promise(async (resolve, reject) => {
		try {
			let resp = await axios.delete(URL + "members/" + id);
			if (resp.data) {
				resolve(resp.data);
			}
			reject("Error");
		} catch (err) {
			reject(err);
		}
	});
};

const deleteByMovieId = id => {
	return new Promise(async (resolve, reject) => {
		try {
			let resp = await axios.delete(URL + "movies/" + id);
			if (resp.data) {
				resolve(resp.data);
			}
			reject("Error");
		} catch (err) {
			reject(err);
		}
	});
};

module.exports = {
	getAll,
	getById,
	addNew,
	updateById,
	deleteById,
	deleteByMemberId,
	deleteByMovieId,
	getByMemberId,
	getByMovieId,
};
