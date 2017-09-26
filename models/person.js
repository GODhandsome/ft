var mongoose = require("mongoose");
var Schemas = require("../schemas/person");

var Person  = mongoose.model("people",Schemas);
module.exports = Person; 