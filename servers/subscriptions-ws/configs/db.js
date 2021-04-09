const mongoose = require("mongoose");

const connectionString = "mongodb://localhost/subscriptionsDB";

exports.connect = () => {
	return new Promise((resolve, reject) => {
		mongoose
			.connect(connectionString, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
			})
			.then(() => resolve("Connected to the subscriptionsDB!"))
			.catch(() => reject("Couldn't connect to the subscriptionsDB!"));
	});
};
