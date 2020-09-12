var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require('mongoose'),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	seedDB = require("./seeds");
	
mongoose.connect('mongodb://localhost:27017/db_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
//seedDB();

//Passport Configuration
app.use(require("express-session")({
	secret: "This is some secret message!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//This will send user information to each route
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

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
			res.render("campgrounds/index",{campgrounds: allCampgrounds});
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
	res.render("campgrounds/new");
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
			res.render("campgrounds/show",{campground: foundCampground});
		}
	});
});

//===========================
// COMMENTS ROUTES
//===========================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
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

app.post("/campgrounds/:id/comments", isLoggedIn, function(req,res){
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
				author: req.body.author
			}, function(err, comment){
			   if(err){
				   console.log(err);
			   } else {
				   campground.comments.push(comment);
				   campground.save();
				   res.redirect('/campgrounds/' + campground._id);
			   }
			});
		}
	});
});

//========================
//AUTH ROUTES
//========================

//show register form 
app.get("/register",function(req,res){
	res.render("register");
});

//handle sign up logic
app.post("/register",function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});

//show login form 
app.get("/login",function(req,res){
	res.render("login");
});

//handling login logic 
app.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req,res){
});

//logout logic 
app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};


app.listen(3000,function(){
	console.log("The YelpCamp Server Has Started!");
});