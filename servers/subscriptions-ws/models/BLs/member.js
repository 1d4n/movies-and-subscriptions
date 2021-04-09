const Member = require("../Schemas/member");
const subscriptionBL = require('./subscription')

const getAll = () => {
	return new Promise((resolve, reject) => {
		Member.find({})
			.then(data => resolve(data))
			.catch(err => reject(err));
	});
};

const getById = id => {
	return new Promise((resolve, reject) => {
		Member.findById(id)
			.then(data => (data ? resolve(data) : reject("Invalid ID!")))
			.catch(err => reject(err));
	});
};

const addNew = newData => {
	return new Promise((resolve, reject) => {
		const obj = new Member({ ...newData });
		obj.save()
			.then(data => resolve(data))
			.catch(err => reject(err));
	});
};

const updateById = (id, updatedData) => {
	return new Promise((resolve, reject) => {
		Member.findByIdAndUpdate(
			id,
			{ $set: { ...updatedData } },
			{ new: true }
		)
			.then(data => resolve(data))
			.catch(err => reject(err));
	});
};

const deleteById = (id) => {
	return new Promise((resolve, reject) => {
		Member.findByIdAndDelete(id)
			.then(() => subscriptionBL.deleteByMemberId(id))
			.then((data) => (data ? resolve("Deleted") : reject("Invalid ID!")))
			.catch((err) => reject(err));
	});
};

// functions for setup.js

const isCollectionEmpty = () =>
	new Promise((resolve, reject) => {
		Member.countDocuments((err, count) => {
			if (err) {
				reject(err);
			}
			resolve(count === 0);
		});
	});

const addMany = arr => {
	return new Promise((resolve, reject) => {
		Member.insertMany(arr)
			.then(() => resolve("Added all nembers"))
			.catch(err => reject(err));
	});
};

module.exports = {
	getAll,
	getById,
	addNew,
	updateById,
	deleteById,
	addMany,
	isCollectionEmpty,
};
