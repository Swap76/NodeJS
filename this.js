var bucky ={
	print: function (){
		console.log("this is bucky");
		console.log(this === bucky);
	}
};

bucky.print();
//global.print();

function dosomething(){
	console.log("this is dosomething");
	console.log(this === global);
}

dosomething();
