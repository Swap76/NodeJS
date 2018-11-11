function takeOrder(orderNumber)
{
	console.log('coustomer order :-  '+orderNumber);
	orderComleted(function(){
		console.log('order completed:- '+ orderNumber)
	});
}

function orderComleted(callBack)
{
	setTimeout(callBack,5000);
}

takeOrder(1);
takeOrder(2);
takeOrder(3);
takeOrder(4);
takeOrder(5);
