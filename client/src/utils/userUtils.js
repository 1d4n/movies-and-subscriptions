import utils from "./utils";
const URL = "/users/";

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
		let { data } = await utils.getById(URL, id);
		let obj = {
			name: data.firstName + " " + data.lastName,
			username: data.username,
			sessionTimeout: data.sessionTimeout,
			createdDate: data.createdDate,
			permissions: data.permissions ? data.permissions : [],
		};
		return obj;
	} catch (err) {
		return "Error";
	}
};

const updateById = async (id, updatedData) => {
	try {
		let resp = await utils.updateById(URL, id, {
			...updatedData,
			sessionTimeout: updatedData.sessionTimeout ?? 0,
			permissions: updatedData.checked,
		});

		return resp.data;
	} catch (err) {
		console.error(err);
		return "Error";
	}
};

const addNew = async (newUserData) => {
	try {
		let resp = await utils.post(URL, {
			...newUserData,
			permissions: newUserData.checked,
		});

		return resp.data;
	} catch (err) {
		console.error(err);
		return "Error";
	}
};

const deleteById = async (id) => {
	try {
		let resp = await utils.deleteById(URL, id);
		return resp.data;
	} catch (err) {
		console.error(err);
		return "Error";
	}
};

const signin = async (username = "", password = "") => {
    try {
        const { data } = await utils.post(URL + "signin/", { username, password });
        return data;
    } catch (err) {
        if (err.response) throw new Error(err.response.data?.message);
		throw new Error("error");
    }
}

const signup = async (username = "", password = "") => {
    try {
        const { data } = await utils.post(URL + "signup/", { username, password });
        return data;
    } catch (err) {
        if (err.response) throw new Error(err.response.data?.message);
        throw new Error("error!");
    }
}

const exportObj = {
	getAll,
	getById,
	addNew,
	updateById,
	deleteById,
    signin,
    signup
};
export default exportObj;
