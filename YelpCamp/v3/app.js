var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require('mongoose'),
	Campground = require("./models/campground"),
	seedDB = require("./seeds");
	
seedDB();
mongoose.connect('mongodb://localhost:27017/db_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("landing");
});

//INDEX - Display all campgrounds
app.get("/campgrounds",function(req,res){
	//Retrieve all campgrounds form DB
	Campground.find({},function(err, allCampgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render("index",{campgrounds: allCampgrounds});
		}
	});
});

//CREATE - Add new campground to DB 
app.post("/campgrounds",function(req,res){
	//get data from the form and add it to the campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name: name, image: image, description: description};
	
	//create a new campground and save to DB
	Campground.create(newCampground,function(err, newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			//redirect back to campgrounds
			res.redirect("/campgrounds");
		}
	});
});

//NEW - Show form to create new campground
app.get("/campgrounds/new",function(req,res){
	res.render("new");
});

//SHOW - Shows more information about one campground
app.get("/campgrounds/:id",function(req,res){
	//find campground with provided id 
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}
		else{
			//render show template with that campground
			res.render("show",{campground: foundCampground});
		}
	});
});

app.listen(3000,function(){
	console.log("The YelpCamp Server Has Started!");
});