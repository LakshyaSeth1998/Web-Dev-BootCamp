var express = require("express");
var app = express();

//We will make a very simple app

//ROUTES

//Print Hi there when path / is called
app.get("/",function(req,res){
	res.send("Hi there!!!");
});

app.get("/bye",function(req,res){
	res.send("Bye!!!");
});

app.get("/dogs",function(req,res){
	console.log("Someone opened /dogs route")
	res.send("MEOW!!!");
});

app.get("/r/:subredditName",function(req,res){
	var subName=req.params.subredditName;
	res.send("Welcome to the "+ subName + " SUBREDDIT");
});

app.get("/r/:subredditName/comments/:id/:title",function(req,res){
	console.log(req.params);
	res.send("Welcome to Comments Page");
});

app.get("*",function(req,res){
	console.log("You are a Star");
});


//Tell express to listen for requests
app.listen(3000, function(){
	console.log("Server listening to port 3000");
});