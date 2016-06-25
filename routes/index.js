var express = require('express');
var router = express.Router();
var models = require("./models");
var LibroModel = models.LibroModel;
var Client = require('node-rest-client').Client;
var client = new Client()


/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index.jade');
    console.log("Pagina principal");
});


router.get('/libro/:title',function(req,res,next){

	var titulo = req.params.title;
	LibroModel.find({title:titulo},function(err,docs){
		if (docs.length != 0 ){
			client.get("https://www.googleapis.com/books/v1/volumes?q="+docs[0].title, function(data,response){
		        var image = data["items"][0]["volumeInfo"]["imageLinks"]["thumbnail"];
		        var descripcion = data["items"][0]["volumeInfo"]["description"];
		        var autor = data["items"][0]["volumeInfo"]["authors"];
		        var editor = data["items"][0]["volumeInfo"]["publisher"];
		        var fecha_publicacion = data["items"][0]["volumeInfo"]["publishedDate"];
		        res.render('mostrarlibro.jade',{valores:docs[0],
		        								imagen:image,
		        								autor:autor,
		        								editor:editor,
		        								fecha_publicacion:fecha_publicacion,
		        								descripcion:descripcion});
		    });
			
		}
	})
	
});

//agregado borrar
;
router.get('/prueba/:titulo', function(req,res,next){
    console.log("Prueba borrar");
    client.get("https://www.googleapis.com/books/v1/volumes?q="+req.params.titulo, function(data,response){
        res.render("listadoLibros.jade", {valores:data["items"]});
    });
});


module.exports = router;
