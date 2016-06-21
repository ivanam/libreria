var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.jade');
});

router.get('/:title',function(req,res, next){

	LibroModel.find({title:req.params.title}, function(err,docs){

		
		if (docs.length != 0){

			var id = docs[0].title;

			client.get("https://www.googleapis.com/books/v1/volumes?q="+id, function(data,response){
		
				//res.send(data["items"][0]);
				res.render("listadoLibros.jade", {valores:data["items"]});
			});

		}else{
			res.send("ESTE LIBRO NO SE ENCUENTRA DISPONIBLE EN LA BASE DE DATOS");
		}

	});
});

module.exports = router;
