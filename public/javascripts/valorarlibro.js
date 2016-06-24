$("#btnLike").click(function(){

	$.post("../api/libro/leandro titulo/reactions/like",function success(data){
		var span = $("#likes");
		span.text((parseInt(span.text()) + 1).toString());
	})
});

$("#btnHaha").click(function(){

	$.post("../api/libro/leandro titulo/reactions/haha",function success(data){
		var span = $("#haha");
		span.text((parseInt(span.text()) + 1).toString());
	})
});

$("#btnWow").click(function(){

	$.post("../api/libro/leandro titulo/reactions/wow",function success(data){
		var span = $("#wow");
		span.text((parseInt(span.text()) + 1).toString());
	})
});

$("#btnSad").click(function(){

	$.post("../api/libro/leandro titulo/reactions/sad",function success(data){
		var span = $("#sad");
		span.text((parseInt(span.text()) + 1).toString());
	})
});

$("#btnAngry").click(function(){

	$.post("../api/libro/leandro titulo/reactions/angry",function success(data){
		var span = $("#angry");
		span.text((parseInt(span.text()) + 1).toString());
	})
});