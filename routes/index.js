var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
   res.render('index.jade');
   console.log("Pagina principal");
  res.render('busqueda.jade');

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
