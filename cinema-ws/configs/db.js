const mongoose = require("mongoose");

exports.connect = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => resolve("Connected to the usersDB!"))
      .catch(() => reject("Couldn't connect to the usersDB!"));
  });
};