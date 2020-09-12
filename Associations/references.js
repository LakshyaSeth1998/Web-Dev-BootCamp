var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/restful_blog_app', {useNewUrlParser: true,useUnifiedTopology: true});

var Post = require("./models/post");
var User = require("./models/user");

// User.create({
// 	email: "Bob",
// 	name: "Bob the Builder"
// },function(err,user){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(user);
// 	}
// });

Post.create({
	title: "How to make burger pt.3",
	content: "Blah blah blah slidhlij;oj;obsjdnbksdksjnk"
},function(err,post){
	User.findOne({email: "Bob"}, function(err,foundUser){
		if(err){
			console.log(err);
		}
		else{
			foundUser.posts.push(post);
			foundUser.save(function(err,data){
				if(err){
					console.log(err);
				}
				else{
					console.log(data);
				}
			});
		}
	});
});


//Find User
//Find All Posts of User

// User.findOne({email: "Bob"}).populate("posts").exec(function(err,user){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(user);
// 	}
// });

