const mongoose = require("mongoose");

const connectionString = "mongodb://localhost/usersDB";

exports.connect = () => {
	return new Promise((resolve, reject) => {
		mongoose
			.connect(connectionString, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
			})
			.then(() => resolve("Connected to the usersDB!"))
			.catch(() => reject("Couldn't connect to the usersDB!"));
	});
};
