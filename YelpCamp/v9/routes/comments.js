var express = require("express"),
	router = express.Router(),
	Campground = require("../models/campground"),
	Comment = require("../models/comment");

router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
	//find campground by id
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new", {campground: campground});
		}
	});
});

router.post("/campgrounds/:id/comments", isLoggedIn, function(req,res){
	//lookup campground using id 
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
			//retrieve comment and add to the campground 
			Comment.create({
				text: req.body.text,
			}, function(err, comment){
			   if(err){
				   console.log(err);
			   } else {
				   //add username and id to the comment 
				   comment.author.id = req.user._id;
				   comment.author.username = req.user.username;
				   comment.save();
				   campground.comments.push(comment);
				   campground.save();
				   // console.log(comment);
				   res.redirect('/campgrounds/' + campground._id);
			   }
			});
		}
	});
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};

module.exports = router;