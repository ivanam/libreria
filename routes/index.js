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


router.get('/libros',function(req, res, next){

	LibroModel.find({},function(err,docs){
		if (docs.length != 0){
			//res.send(docs);
			res.render('alllibros.jade',{data:docs});
		}
	});
});



router.get('/libros/:title',function(req,res,next){
	
	var titulo = req.params.title;
	LibroModel.find({title:titulo},function(err,docs){
		if (docs.length != 0 ){
			client.get("https://www.googleapis.com/books/v1/volumes/"+docs[0].id_google, function(data,response){
		        var image = data["volumeInfo"]["imageLinks"]["thumbnail"];
		        var descripcion = data["volumeInfo"]["description"];
		        if (validar(descripcion)){
		        descripcion = descripcion.replace(/<br>|<p>|<\/p>|<b>|<\/b>/g," ");
		    	}
		        var autor = data["volumeInfo"]["authors"];
		        var editor = data["volumeInfo"]["publisher"];
		        var fecha_publicacion = data["volumeInfo"]["publishedDate"];
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

  /*Verifica si un campo se encuentra no definido*/
    function validar(campo){
        if (campo === undefined){
            return false;
        }else{
            return true;
        }
    }
module.exports = router;
