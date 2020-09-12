var express = require("express"),
	app = express(),
	bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine","ejs");

var campgrounds=[
		{name: "Salmon Creek", image:"https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=647&q=80"},
		{name: "Granite Hill", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTrK9TDnDw8Ck5KdUbMAUCc99o0gjlXX8U6Wg&usqp=CAU"},
		{name: "Mountain Goat", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkwydNhPr3XG9hWLEaB5rgBzQxSC2gQwIFBw&usqp=CAU"},
		{name: "Stone Hill", image:"https://images.unsplash.com/photo-1478827536114-da961b7f86d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
		{name: "Chilli Creek", image:"https://images.unsplash.com/photo-1581294928308-996bf276ed29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
		{name: "Hawai Creek", image:"https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
	
];

app.get("/",function(req,res){
	res.render("landing");
});

app.get("/campgrounds",function(req,res){

	res.render("campgrounds",{campgrounds: campgrounds});
});

app.post("/campgrounds",function(req,res){
	//get data from the form and add it to the campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	
	//redirect back to campgrounds
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
	res.render("new");
});

app.listen(3000,function(){
	console.log("The YelpCamp Server Has Started!");
});