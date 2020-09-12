var express = require("express"),
	app = express();

app.use(express.static("public")); //So express will also look inside public directory

app.set("view engine", "ejs");  //Express will know that only .ejs files will be rendered therefore we dont need to write somefile.ejs

app.get("/", function(req, res){
    res.render("home");
});

app.get("/fallinlovewith/:thing", function(req, res){
  var thing = req.params.thing;
   res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res){
    var posts = [
        {title: "Post 1", author: "Susy"},
        {title: "My adorable pet bunny", author: "Charlie"},
        {title: "Can you believe this pomsky?", author: "Colt"}
    ];
    
    res.render("posts", {posts: posts});
})

app.listen(3000, function(){
   console.log("Server is listening at port 3000!!!"); 
});