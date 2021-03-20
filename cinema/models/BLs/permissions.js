const jsonFile = require("jsonfile");
const file = "./data/permissions.json";

const getAll = () => {
	return new Promise((resolve, reject) => {
		jsonFile
			.readFile(file)
			.then(data => resolve(data.users))
			.catch(err => reject(err));
	});
};

const getById = id => {
	return new Promise(async (resolve, reject) => {
		try {
			let data = await jsonFile.readFile(file);
			let arr = data.users.filter(p => p._id === id);

			if (arr.length === 1) {
				resolve(arr[0]);
			}
			reject("Invalid ID");
		} catch (err) {
			reject(err);
		}
	});
};

const addNew = (newId, newData) => {
	return new Promise(async (resolve, reject) => {
		try {
			let data = await jsonFile.readFile(file);

			let obj = {
				_id: newId,
				permissions: newData.permissions ? newData.permissions : [],
			};
			data.users.push(obj);

			await jsonFile.writeFile(file, data);
			resolve(obj);
		} catch (err) {
			reject(err);
		}
	});
};

const updateById = (id, updatedData) => {
	return new Promise(async (resolve, reject) => {
		try {
			let data = await jsonFile.readFile(file);

			let i = data.users.findIndex(user => user._id === id);
			let obj = {
				_id: id,
				permissions:
					updatedData.permissions ?? data.users[i].permissions,
			};

			data.users.splice(i, 1, obj);
			await jsonFile.writeFile(file, data);
			resolve(obj);
		} catch (err) {
			reject(err);
		}
	});
};

const deleteById = id => {
	return new Promise(async (resolve, reject) => {
		try {
			let data = await jsonFile.readFile(file);

			let filteredData = data.users.filter(p => p._id !== id);
			await jsonFile.writeFile(file, { users: filteredData });
			resolve("Deleted");
		} catch (err) {
			reject(err);
		}
	});
};

module.exports = { getById, getAll, addNew, updateById, deleteById };
