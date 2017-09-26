var mongoose = require("mongoose");
var Schemas = mongoose.Schema({
	username:String,
	password:String,
	callname:String
});
module.exports=Schemas;