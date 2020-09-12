var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/restful_blog_app', {useNewUrlParser: true,useUnifiedTopology: true});

//POST - title, content 

var postSchema = new mongoose.Schema({
	title: String,
	content: String
});
var Post = mongoose.model("Post",postSchema);

//USER - email, name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});
var User = mongoose.model("User",userSchema);

// var newUser = new User({
// 	email: "hermoine@hogwards.edu",
// 	name: "Hermoine"
// });

// newUser.posts.push({
// 	title: "How to make slurrpy potion",
// 	content: "Hey there its confidential info"
// });

// newUser.save(function(err,user){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(user);
// 	}
// });

// var newPost = new Post({
// 	title: "Apples",
// 	content: "Apples are nice"
// });
// newPost.save(function(err,post){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(post);
// 	}
// });
