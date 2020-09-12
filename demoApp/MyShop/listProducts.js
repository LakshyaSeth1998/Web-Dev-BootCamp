var faker = require("faker");

console.log("===================");
console.log("WELCOME TO MY SHOP!");
console.log("===================");

function printRandomData(num){
	for(var i=0;i<num;i++){
		console.log(faker.fake("{{commerce.productName}} - ${{commerce.price}}"));
	}
}

printRandomData(10);