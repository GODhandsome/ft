var mongoose = require("mongoose");
var Schemas = mongoose.Schema({
	src:String,
	name:String,
	des:String
});
module.exports = Schemas;