var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();
var models = require("./models");
var LibroModel = models.LibroModel;

/* 
	Ruta para consultar todos los libros
	almacenados en la base de datos
*/
router.get('/', function(req, res, next) {
	LibroModel.find({},function(err, libros) {
	    if(err) {
	        res.send(err);
	    }
	    res.json(libros);
	});
});


/*
	Ruta para consultar por un libro en particular
	segun su titulo.
*/
router.get('/:title',function(req,res, next){

	LibroModel.find({title:req.params.title}, function(err,docs){

		
		if (docs.length != 0){

			res.json(docs);

		}else{
			//res.send("ESTE LIBRO NO SE ENCUENTRA DISPONIBLE EN LA BASE DE DATOS");
			var id = req.params.title;

			client.get("https://www.googleapis.com/books/v1/volumes?q="+id, function(data,response){
		
				res.send(data);
				//res.render("listado.jade", {valores:data["items"]});
			});
		}

	});
});


router.post('/',function(req, res, next){

	//Aca rebir el id de google buscar la informacion
	// y crear el nuevo objeto 
	var libro = LibroModel();
	libro._id = "Messi y el mundial de su vida";
	libro.title = "Messi y el mundial de su vida";
	libro.id_google = "H-xtAwAAQBAJ";
	libro.precios_locales = [78.99];
	libro.reactions.sad = 0;
	libro.reactions.angry = 0;
	libro.reactions.like = 0;
	libro.reactions.haha = 0;
	libro.reactions.wow = 0;
	libro.save();
	res.end();
});

/*
	Ruta que devuelve las reacciones para
	un libro en particular
*/
router.get('/:title/reactions',function(req,res,next){

	LibroModel.find({title:req.params.title}, function(err,docs){

		
		if (docs.length != 0){
			res.json(docs[0].reactions);

		}else{
			res.json({});
		}

	});
});

/*
	Ruta que permite incrementar la cantidad en
	uno de una reaccion en particular de un libro
*/
router.post('/:title/reactions/:reaction',function(req, res, next){

	LibroModel.find({title:req.params.title}, function(err,docs){
		
		if (docs.length != 0){

			var valor = docs[0].reactions[req.params.reaction];
			docs[0].reactions[req.params.reaction] = valor + 1;
			docs[0].save();
			res.end();
		}

	});
});



module.exports = router;
