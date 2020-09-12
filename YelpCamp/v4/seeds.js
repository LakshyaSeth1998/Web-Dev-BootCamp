var mongoose = require('mongoose'),
	Campground = require("./models/campground"),
 	Comment   = require("./models/comment");

var data = [
	{
		name: "Granite Hill",
		image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTrK9TDnDw8Ck5KdUbMAUCc99o0gjlXX8U6Wg&usqp=CAU",
		description: "blah blah blah"
	},
	{
		name: "Sea Camp",
		image:"https://images.pexels.com/photos/6757/feet-morning-adventure-camping.jpg?auto=compress&cs=tinysrgb&h=350",
		description: "blah blah blah"
	},
	{
		name: "Rainforest Camp",
		image:"https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf85254784c762e7cd39645_340.jpg",
		description: "blah blah blah"	
	}
];
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
			for(var i=0;i<data.length;i++){
                Campground.create(data[i], function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            }
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;

// function seedDB(){
// 	//remove all campgrounds
// 	Campground.remove({}, function(err){
// 		if(err){
// 			console.log(err);
// 		}
// 		else{
// 			console.log("Removed Campgrounds!");
			
// 			//add few campgrounds
// 			for(var i=0;i<data.length;i++){
// 				Campground.create(data[i],function(err,data){
// 					if(err){
// 						console.log(err);
// 					}
// 					else{
// 						console.log("Added a campground!");
// 					}
// 				});
// 			}
// 		}
// 	});
// }