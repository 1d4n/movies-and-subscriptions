import utils from "./utils";
const URL = "/members/"

const getAll = async () => {
	try {
		let resp = await utils.getAll(URL);
		return resp.data;
	} catch (err) {
		console.error(err);
		return "Error";
	}
};

const getById = async (id) => {
	try {
		let resp = await utils.getById(URL, id);
		return resp.data;
	} catch (err) {
		console.error(err);
		return "Error";
	}
};

const updateById = async (id, updatedData) => {
	try {
		let resp = await utils.updateById(URL, id, updatedData);

		return resp.data;
	} catch (err) {
		console.error(err);
		return "Error";
	}
};

const addNew = async (newData) => {
	try {
		let resp = await utils.post(URL, newData);

		return resp.data;
	} catch (err) {
		console.error(err);
		return "Error";
	}
};

const deleteById = async (id) => {
	try {
		await utils.deleteById(URL, id);
		return "Deleted";
	} catch (err) {
		console.error(err);
		return "Error";
	}
};

const exportObj = {
	getAll,
	getById,
	addNew,
	updateById,
	deleteById,
};
export default exportObj;
