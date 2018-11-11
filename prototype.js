var User = function(){
	this.name="";
	this.life=100;
}

var swapnil= new User();
var omkar= new User();

swapnil.name="Swapnil";
console.log(swapnil.name);
console.log(swapnil.life);
omkar.name="Omkar";
console.log(omkar.name);
console.log(omkar.life);
console.log("Increased life are :-  ")
//adding function to object
User.prototype.increseLife=function(){
	this.life+=5;
	console.log(this.name);
	console.log(this.life);
}
swapnil.increseLife();
omkar.increseLife();
//adding property to object
User.prototype.magic=50;
console.log(swapnil.magic);
console.log(omkar.magic);

