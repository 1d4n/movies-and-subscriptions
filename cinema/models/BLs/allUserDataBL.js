const userBL = require("./user");
const userOtherDataBL = require("./userOtherData");
const permissionBL = require("./permissions");

const objMaker = (dbData, userData, permissionsData) => ({
	_id: dbData._id,
	username: dbData.username,
	password: dbData.password,
	firstName: userData.firstName,
	lastName: userData.lastName,
	createdDate: userData.createdDate,
	sessionTimeout: userData.sessionTimeout,
	permissions: permissionsData.permissions,
});

const getAll = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let userData = await userBL.getAll();
			let otherUserData = await userOtherDataBL.getAll();
			let permissions = await permissionBL.getAll();

			let allData = userData.map((user, i) =>
				objMaker(user._doc, otherUserData[i], permissions[i])
			);

			resolve(allData);
		} catch (err) {
			reject(err);
		}
	});
};

const getById = id => {
	return new Promise(async (resolve, reject) => {
		try {
			let userData = await userBL.getById(id);
			let otherUserData = await userOtherDataBL.getById(id);
			let permissions = await permissionBL.getById(id);

			let obj = objMaker(userData, otherUserData, permissions);
			resolve(obj);
		} catch (err) {
			reject(err);
		}
	});
};

const addNew = newData => {
	return new Promise(async (resolve, reject) => {
		try {
			let userData = await userBL.addNew(newData);
			let otherUserData = await userOtherDataBL.addNew(
				userData._id,
				newData
			);
			let permissions = await permissionBL.addNew(userData._id, newData);

			let obj = objMaker(userData._doc, otherUserData, permissions);
			resolve(obj);
		} catch (err) {
			reject(err);
		}
	});
};

const updateById = (id, updatedData) => {
	return new Promise(async (resolve, reject) => {
		try {
			let userData = await userBL.updateById(id, updatedData);
			let otherUserData = await userOtherDataBL.updateById(
				id,
				updatedData
			);
			let permissions = await permissionBL.updateById(id, updatedData);

			let obj = objMaker(userData._doc, otherUserData, permissions);

			resolve(obj);
		} catch (err) {
			reject(err);
		}
	});
};

const deleteById = id => {
	return new Promise(async (resolve, reject) => {
		try {
			await userBL.deleteById(id);
			await userOtherDataBL.deleteById(id);
			await permissionBL.deleteById(id);

			resolve("Deleted");
		} catch (err) {
			reject(err);
		}
	});
};

module.exports = { getAll, getById, addNew, updateById, deleteById };
