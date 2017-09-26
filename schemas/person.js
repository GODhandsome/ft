var mongoose = require("mongoose");
var Schemas = mongoose.Schema({
	img:String,
	name:String,
	good:Number,
	des:String,
	photo:Array,
	follow:Array,
	fans:Array
});

module.exports = Schemas;