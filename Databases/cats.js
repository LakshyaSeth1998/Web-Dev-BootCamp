const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat",catSchema);

//add new cat to DB

var george = new Cat({
	name: "Nancy",
	age: 5,
	temperament: "Moody"
});

george.save(function(err,cat){
	if(err){
		console.log("Something went wrong!");
		console.log(err);
	}
	else{
		console.log("We just saved a cat to DB");
		console.log(cat);
	}
});

//add new cat to DB in 1 step

Cat.create({
	name: "Snow White",
	age: 15,
	temperament: "Bland"
},function(err,cat){
	if(err){
		console.log("Something went wrong!");
		console.log(err);
	}
	else{
		console.log("We just saved a cat to DB");
		console.log(cat);
	}
});

//retrieve all cats from DB and console.log them

Cat.find({},function(err,cats){
	if(err){
		console.log("Something went wrong!");
		console.log(err);
	}
	else{
		console.log("All cats are ....");
		console.log(cats);
	}
});