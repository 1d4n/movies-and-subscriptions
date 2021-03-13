const mognoose = require("mongoose");

const Permission = new mognoose.Schema({
  _id: mognoose.Types.ObjectId,
  permissions: [{ type: String }],
});

module.exports = mognoose.model("Permission", Permission, "permissions");
