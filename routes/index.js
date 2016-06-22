var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index.jade');
    console.log("Pagina principal");
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

//agregado borrar
var Client = require('node-rest-client').Client;
var client = new Client();
router.get('/prueba/:titulo', function(req,res,next){
    console.log("Prueba borrar");
    client.get("https://www.googleapis.com/books/v1/volumes?q="+req.params.titulo, function(data,response){
        res.render("listadoLibros.jade", {valores:data["items"]});
    });
});



module.exports = router;
