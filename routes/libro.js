var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/liberbook');
var LibroModel = mongoose.model('LibroModel',{

    _id: String,
    title: String,
    precios_locales: [Number],
    reactions: {

        like: Number,
        angry: Number,
        sad: Number,
        haha: Number,
        wow: Number
    }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
	LibroModel.find(function(err, libros) {
	    if(err) {
	        res.send(err);
	    }
	    res.json(libros);
	});
});


/*
	Ruta para consultar por un libro en particular
	segun su ID.
*/
router.get('/:title',function(req,res, next){

	LibroModel.find({title:req.params.title}, function(err,docs){

		
		if (docs.length != 0){

			var id = docs[0].title;

			client.get("https://www.googleapis.com/books/v1/volumes?q="+id, function(data,response){
		
				//res.send(data["items"][0]);
				res.render("listado.jade", {valores:data["items"]});
			});

		}else{
			res.send("ESTE LIBRO NO SE ENCUENTRA DISPONIBLE EN LA BASE DE DATOS");
		}

	});
});


router.post('/',function(req, res, next){

	var libro = LibroModel();
	libro._id = "leandro";
	libro.title = "leandro titulo";
	libro.precios_locales = [30.2];
	libro.reactions.sad = 0;
	libro.reactions.angry = 0;
	libro.reactions.like = 0;
	libro.reactions.haha = 0;
	libro.reactions.wow = 0;
	libro.save();
	next();
});



/*
	Ruta para consultar por un libro en particular
	segun su titulo
*/
router.get('/titulo/:title',function(req,res, next){

	var title = req.params.title;
	res.send("api rest funciona con " + title);
});

router.get('/buscador/:title',function(req,res, next){

	res.send("api rest funciona con " + req.params.title);
});




// / Rutas de nuestro API
// // GET de libro los Libro
// app.get('/api/libros', function(req, res) {  
//     console.log("app.get libros");
//     Libro.find(function(err, libros) {
//         if(err) {
//             res.send(err);
//         }
//         res.json(libros);
//     });
// });


// //debería meterlo en un modulo API
// // POST que crea un Libro y devuelve libros tras la creación
// app.post('/api/libros', function(req, res) {  
//     console.log("app.post libros");
//     Libro.create({
//         text: req.body.text,
//         done: false
//     }, function(err, libro){
//         if(err) {
//             res.send(err);
//         }

//         Libro.find(function(err, libros) {
//             if(err){
//                 res.send(err);
//             }
//             res.json(libros);
//         });
//     });
// });

// // DELETE un Libro específico y devuelve libros tras borrarlo.
// app.delete('/api/libros/:libro', function(req, res) {  
//     console.log("app.delete libros");
//     Libro.remove({
//         _id: req.params.libro
//     }, function(err, libro) {
//         if(err){
//             res.send(err);
//         }

//         Libro.find(function(err, libros) {
//             if(err){
//                 res.send(err);
//             }
//             res.json(libros);
//         });

//     })
// });







module.exports = router;
