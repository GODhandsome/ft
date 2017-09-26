var mongoose = require("mongoose");
var Schemas = require("../schemas/found");
var Found = mongoose.model("found",Schemas);
module.exports= Found;