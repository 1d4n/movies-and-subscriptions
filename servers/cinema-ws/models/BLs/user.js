const User = require("../Schemas/user");
const otherUserDataBL = require("./otherUserData");
const permissionsBL = require('./permissions');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const getAll = () => {
	return new Promise((resolve, reject) => {
		User.find({})
			.then((data) => resolve(data))
			.catch((err) => reject(err));
	});
};

const getById = (id) => {
	return new Promise((resolve, reject) => {
		User.findById(id)
			.then((data) => {
				if (data) {
					resolve(data);
				}
				reject("Invalid ID!");
			})
			.catch((err) => reject(err));
	});
};

const updateById = (id, updatedData) => {
	return new Promise((resolve, reject) => {
		User.findByIdAndUpdate(id, { $set: updatedData }, { new: true })
			.then((data) => resolve(data))
			.catch((err) => reject(err));
	});
};

const addNew = (newData) => {
	return new Promise((resolve, reject) => {
		bcrypt
			.hash("", 10)
			.then((hashed) => new User({ username: newData.username, password: hashed }).save())
			.then((data) => resolve(data))
			.catch((err) => reject(err));
	});
};

const deleteById = (id) => {
	return new Promise((resolve, reject) => {
		User.findByIdAndDelete(id)
			.then((data) => {
				if (data) {
					resolve(data);
				}
				reject("Invalid ID!");
			})
			.catch((err) => reject(err));
	});
};

const login = (username, password) => {
	return new Promise((resolve, reject) => {
		User.find({ username }, (err, user) => {
			if (err) {
				reject(err);
			} else if (!user.length) {
				reject("Invalid Username!");
			} else {
				if (user[0].password === password) {
					resolve(user[0]._id);
				} else {
					reject("Invalid Password!");
				}
			}
		});
	});
};

const signin = (username, password) =>
    new Promise(async (resolve, reject) => {
        try {
            const existing = await User.findOne({ username });
            if (!existing) return reject("not exists");
            const userId = String(existing._id);

            const isNotRegistered = await bcrypt.compare("", existing.password);
            if (isNotRegistered) return reject("not registered");
            
			const isPasswordCorrect = await bcrypt.compare(password, existing.password);
			if (!isPasswordCorrect) return reject("wrong password");

            const otherUserData = await otherUserDataBL.getById(userId);
            const permissions = await permissionsBL.getById(userId);

			const token = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN, {
				expiresIn: 60 * otherUserData.sessionTimeout,
			});
			//const refreshToken = jwt.sign({ username: existing.username }, process.env.refreshToken);
			resolve({ token, data: {username, ...otherUserData, ...permissions} });
		} catch (err) {
			reject(err);
		}
	});

const signup = (username, password) =>
	new Promise(async (resolve, reject) => {
		try {
			const existing = await User.findOne({ username });
			if (!existing) return reject("Invalid username!");
			const isNew = await bcrypt.compare("", existing.password);
			if (!isNew) return reject("Already registered!");

			const hashedPassword = await bcrypt.hash(password, 10);
			await User.findByIdAndUpdate(existing._id, { $set: { password: hashedPassword } });
			resolve("Successfully registered!");
		} catch (err) {
			reject(err);
		}
	});

module.exports = { getAll, getById, updateById, addNew, deleteById, login, signin, signup };