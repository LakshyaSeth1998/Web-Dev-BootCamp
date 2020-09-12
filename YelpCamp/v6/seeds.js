var mongoose = require('mongoose'),
	Campground = require("./models/campground"),
 	Comment   = require("./models/comment");

var data = [
	{
		name: "Granite Hill",
		image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTrK9TDnDw8Ck5KdUbMAUCc99o0gjlXX8U6Wg&usqp=CAU",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel odio eu est laoreet varius. Etiam tristique lectus turpis, nec maximus nibh facilisis eget. Phasellus aliquet neque eget justo molestie aliquet. Nulla ac mattis est. In pulvinar mi massa, commodo pretium sem consectetur sit amet. Suspendisse blandit dolor metus, at aliquet velit tincidunt sit amet. Quisque nisi eros, venenatis eget mauris interdum, fringilla consectetur justo. Nam lobortis, est vitae tempus convallis, magna arcu porta lorem, et facilisis odio nisl in ligula. Maecenas sodales purus et faucibus euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin fermentum eros erat, ac dictum neque ornare non. Ut in odio risus. Donec venenatis, sapien eu tincidunt pharetra, felis nibh accumsan lorem, eget gravida nibh sem sit amet leo. Fusce bibendum erat a tortor consequat, sit amet commodo metus aliquet."
	},
	{
		name: "Sea Camp",
		image:"https://images.pexels.com/photos/6757/feet-morning-adventure-camping.jpg?auto=compress&cs=tinysrgb&h=350",
		description: "Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc eleifend odio ac augue lacinia, eu fringilla ligula iaculis. Mauris egestas arcu at massa ornare dapibus. Curabitur euismod libero eu rutrum egestas. Morbi ac malesuada orci. Donec auctor mauris vitae lacus tempor, eget pellentesque ex tincidunt. Morbi sed mi ac arcu ultrices egestas a sit amet lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean imperdiet pulvinar nisl suscipit semper. Nam id nisl sit amet massa porttitor sagittis. Aliquam non interdum arcu, ac pellentesque dolor. In eu egestas nulla. Phasellus velit libero, lacinia eu ex eu, ultricies luctus massa."
	},
	{
		name: "Rainforest Camp",
		image:"https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf85254784c762e7cd39645_340.jpg",
		description: "Phasellus vulputate malesuada tincidunt. Phasellus eu condimentum odio, non pulvinar ex. Quisque ultrices velit odio, sed rhoncus felis dapibus ac. Phasellus quis finibus ligula. Aenean blandit enim eget est consequat luctus. Pellentesque at neque id ex gravida pellentesque sit amet a nisl. Morbi purus enim, hendrerit quis laoreet eget, vehicula vitae augue. Vestibulum ut commodo metus. Quisque finibus eleifend nisi, in consectetur ex ultricies ac. Integer a dui condimentum, pellentesque quam eu, maximus dolor. Donec non sem non est pellentesque condimentum. Quisque vel massa id nibh vehicula condimentum vitae ullamcorper odio. Vivamus non nisi tincidunt, maximus quam eget, malesuada erat. Curabitur a lacinia lorem, a accumsan turpis. Fusce pretium aliquet iaculis. Nam ut nisl non ante consectetur porta."	
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