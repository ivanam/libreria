$("#btnLike").click(function(){

	var titulo = $("#titulo").text().split(": ")[1];
	var url = "../api/libro/"+titulo+"/reactions/like";
	console.log(url);
	$.post(url,function success(data){
		var span = $("#likes");
		span.text((parseInt(span.text()) + 1).toString());
	})
});

$("#btnHaha").click(function(){

	var titulo = $("#titulo").text().split(": ")[1];
	var url = "../api/libro/"+titulo+"/reactions/haha"; 
	$.post(url,function success(data){
		var span = $("#haha");
		span.text((parseInt(span.text()) + 1).toString());
	})
});

$("#btnWow").click(function(){

	var titulo = $("#titulo").text().split(": ")[1];
	var url = "../api/libro/"+titulo+"/reactions/wow"; 
	$.post(url,function success(data){
		var span = $("#wow");
		span.text((parseInt(span.text()) + 1).toString());
	})
});

$("#btnSad").click(function(){

	var titulo = $("#titulo").text().split(": ")[1];
	var url = "../api/libro/"+titulo+"/reactions/sad"; 
	$.post(url,function success(data){
		var span = $("#sad");
		span.text((parseInt(span.text()) + 1).toString());
	})
});

$("#btnAngry").click(function(){

	var titulo = $("#titulo").text().split(": ")[1];
	var url = "../api/libro/"+titulo+"/reactions/angry"; 
	$.post(url,function success(data){
		var span = $("#angry");
		span.text((parseInt(span.text()) + 1).toString());
	})
});