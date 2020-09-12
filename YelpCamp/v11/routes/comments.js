var express = require("express"),
	router = express.Router(),
	Campground = require("../models/campground"),
	Comment = require("../models/comment"),
	middleware = require("../middleware/index.js");

//New Route
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req,res){
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

//Create Route
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req,res){
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
				   req.flash("success","Successfully added comment");
				   res.redirect('/campgrounds/' + campground._id);
			   }
			});
		}
	});
});

//Edit Route 
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership ,function(req,res){
	Comment.findById(req.params.comment_id, function(err,foundComment){
		if(err){
			res.redirect("back");
		}
		else{
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	});
});

//Update Route
router.put("/campgrounds/:id/comments/:comment_id/",middleware.checkCommentOwnership , function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		}
		else{
			res.redirect("/campgrounds/"+req.params.id );
		}
	})
})

//Delete Route 
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		}
		else{
			req.flash("success","Comment deleted");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

module.exports = router;
// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// };

// function checkCommentOwnership(req, res, next){
// 	//Check if the user is logged in
// 	if(req.isAuthenticated()){
// 		Comment.findById(req.params.comment_id, function(err, foundComment){
// 			if(err){
// 				res.redirect("back");
// 			}
// 			else{
// 				//Does user own the comment ?
// 				if(foundComment.author.id.equals(req.user._id)){
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