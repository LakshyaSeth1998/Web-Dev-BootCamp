var express = require("express"),
	router = express.Router(),
	Campground = require("../models/campground"),
	middleware = require("../middleware/index.js");

//INDEX - Display all campgrounds
router.get("/campgrounds",function(req,res){
	//Retrieve all campgrounds form DB
	Campground.find({},function(err, allCampgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/index",{campgrounds: allCampgrounds});
		}
	});
});

//CREATE - Add new campground to DB 
router.post("/campgrounds",middleware.isLoggedIn, function(req,res){
	//get data from the form and add it to the campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, image: image, description: description, author: author};
	
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
router.get("/campgrounds/new",middleware.isLoggedIn, function(req,res){
	res.render("campgrounds/new");
});

//SHOW - Shows more information about one campground
router.get("/campgrounds/:id",function(req,res){
	//find campground with provided id 
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}
		else{
			//render show template with that campground
			res.render("campgrounds/show",{campground: foundCampground});
		}
	});
});

//EDIT - Show form to update a campground
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership ,function(req,res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
			res.render("campgrounds/edit", {campground: foundCampground});
		}
	});
	
});

//UPDATE - Update changes in the campground
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership ,function(req,res){
	//find and update the correct campground 
	Campground.findByIdAndUpdate(req.params.id, req.body.campground , function(err,updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			//redirect to show page
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//DESTROY - Delete a campground
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership ,function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;
// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }

// function checkCampgroundOwnership(req, res, next){
// 	//Check if the user is logged in
// 	if(req.isAuthenticated()){
// 		Campground.findById(req.params.id, function(err, foundCampground){
// 			if(err){
// 				res.redirect("back");
// 			}
// 			else{
// 				//Does user own the campground?
// 				if(foundCampground.author.id.equals(req.user._id)){
// 					next();
// 				}
// 				else{
// 					res.redirect("back");
// 				}
// 			}
// 		});
// 	}
// 	else{
// 		res.redirect("back");
// 	}
// }