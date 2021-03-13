const mognoose = require("mongoose");

const User = new mognoose.Schema({
  _id: mognoose.Types.ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  sessionTimeout: { type: Number, required: true },
});

module.exports = mognoose.model("User", User, "_users");
