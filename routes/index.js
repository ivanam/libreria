var express = require('express');
var router = express.Router();
var models = require("./models");
var LibroModel = models.LibroModel;


/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index.jade');
    console.log("Pagina principal");
});


router.get('/libro/:title',function(req,res,next){

	var titulo = req.params.title;
	LibroModel.find({title:titulo},function(err,docs){

		if (docs.length != 0 ){
			res.render('mostrarlibro.jade',{data:docs[0]});
		}
	})
	
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
