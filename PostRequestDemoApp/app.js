var express = require("express"),
	app = express(),
	bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs");

friends=["Shivam","Pranav","Soumya","Sidhant","Raghav"];

app.get("/",function(req,res){
	res.render("home");
});

app.get("/friends",function(req,res){
	res.render("friends",{friends: friends});
});

app.post("/addFriend",function(req,res){
	var newFriend = req.body.newfriend;
	friends.push(newFriend);
	res.redirect("/friends");
});

app.listen(3000,function(req,res){
	console.log("Server started at port 3000");
});