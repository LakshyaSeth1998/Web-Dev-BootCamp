var express = require("express"),
	app = express();

app.get("/",function(req,res){
	res.send("Hi there! Welcome to my assignment!");
});

app.get("/speak/:animal",function(req,res){
	var animal = req.params.animal;
	if(animal=="pig"){
		res.send("The "+animal+" says 'Oink' ");
	}
	else if(animal=="cow"){
		res.send("The "+animal+" says 'Moo' ");
	}
	else{
		res.send("The "+animal+" says 'Woof Woof' ");
	}
});

app.get("/repeat/:word/:number",function(req,res){
	var word = req.params.word;
	var num = Number(req.params.number);
	var finalRes="";
	for(var i=0;i<num;i++){
		finalRes+=word+" ";
	}
	res.send(finalRes);
});

app.get("*",function(req,res){
	res.send("Sorry page not found ..... What are you doing with your life?");
});


app.listen(3000,function(){
	console.log("Server listening on port 3000");
});