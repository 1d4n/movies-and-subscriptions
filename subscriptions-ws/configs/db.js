const mongoose = require("mongoose");

const connect = () =>
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

exports.connect = connect;
