var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	expressSanitizer = require("express-sanitizer");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/restful_blog_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

//APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

//MONGOOSE MODEL CONFIG
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}  //If we dont input created time,date it will be taken current date time
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create(
// 	{title: "Test Blog",
// 	 image: "https://images.unsplash.com/photo-1560743641-3914f2c45636?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
// 	 body: "Hello this is a blog post"
// 	},function(err,blog){
// 		if(err){
// 			console.log(err);
// 		}
// 		else{
// 			console.log(blog);
// 		}
// 	});

//RESTFUL ROUTES
app.get("/",function(req,res){
	res.redirect("/blogs");	
});

//INDEX ROUTE 
app.get("/blogs",function(req,res){
	Blog.find({},function(err,blogs){
		if(err){
			console.log(err);
		}
		else{
			res.render("index",{blogs: blogs});
		}
	});
});

//NEW ROUTE 
app.get("/blogs/new",function(req,res){
	res.render("new");
});

//CREATE ROUTE
app.post("/blogs",function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	//create post 
	Blog.create(req.body.blog,function(err,newDog){
		if(err){
			res.render("new");
		}
		else{
			res.redirect("/blogs");
		}
	})
	//then redirect to the index
})

//VIEW ROUTE 
app.get("/blogs/:id",function(req,res){
	Blog.findById(req.params.id, function(err,foundBlog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.render("show",{blog: foundBlog});
		}
	});
});

//EDIT ROUTE
app.get("/blogs/:id/edit",function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findById(req.params.id, function(err,foundBlog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.render("edit",{blog: foundBlog});
		}
	});
});

//UPDATE ROUTE 
app.put("/blogs/:id",function(req,res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,updatedBlog){
		if(err){
			res.render("/blogs");
		}
		else{
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

//DELETE ROUTE 
app.delete("/blogs/:id", function(req,res){
	//destroy blog 
	Blog.findByIdAndRemove(req.params.id, function(err){
		//redirect somewhere
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.redirect("/blogs");
		}
	});
});

app.listen(3000,function(){
	console.log("Server has started at port 3000!");
});
