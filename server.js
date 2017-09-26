var mongoose = require("mongoose");
var express = require("express");
var bodyParser =require("body-parser");
var User = require("./models/user");
var Found = require("./models/found");
var Person  = require("./models/person");
var app  = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("assets"));


mongoose.connect("mongodb://localhost:27017/projectx");
var db = mongoose.connection;




db.once("open",function(){
	console.log("数据库连接成功");
});



app.post("/api/register",function(req,res){
	var obj = new User({
		username:req.body.username,
		password:req.body.password,
		callname:req.body.callname
	});
	obj.save(function(err,doc){
		if(err) return;
		res.json({
			status:0,
			msg:"注册成功"
		})
	});
});



app.post("/api/find",function(req,res){
	User.find(req.body,function(err,doc){
		if(doc.length==0) 
			return res.json({status:0});
		return res.json({status:1})
	})
});


app.post("/api/login",function(req,res){
	User.find(req.body,function(err,doc){
		if(doc.length==0)
			return res.json({status:1});
		return res.json({status:0});
	});
});

app.post("/api/found",function(req,res){
	Found.find(req.body,function(err,doc){
		res.json(doc);
	})

});


app.post("/api/person",function(req,res){
	Person.find(req.body,function(err,doc){
		res.json(doc)
	});
});


app.post("/api/foot",function(req,res){
	req.body.msg=10;
	res.json(req.body);
})





app.listen(8080);