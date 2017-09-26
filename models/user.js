var mongoose = require("mongoose");
var Schema = require("../schemas/user.js");
var User = mongoose.model("user",Schema);
module.exports = User;