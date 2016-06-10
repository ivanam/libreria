
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var express     = require('express');  
var app         = express();  
var mongoose     = require('mongoose');

// Conexión con la base de datos
mongoose.connect('mongodb://localhost:27017/liberbook');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', users);

// Definición de modelos
var Libro = mongoose.model('Libro', {  
    text: String
});
// Rutas de nuestro API
// GET de libro los Libro
app.get('/api/libros', function(req, res) {  
    console.log("app.get libros");
    Libro.find(function(err, libros) {
        if(err) {
            res.send(err);
        }
        res.json(libros);
    });
});

//debería meterlo en un modulo API
// POST que crea un Libro y devuelve libros tras la creación
app.post('/api/libros', function(req, res) {  
    console.log("app.post libros");
    Libro.create({
        text: req.body.text,
        done: false
    }, function(err, libro){
        if(err) {
            res.send(err);
        }

        Libro.find(function(err, libros) {
            if(err){
                res.send(err);
            }
            res.json(libros);
        });
    });
});

// DELETE un Libro específico y devuelve libros tras borrarlo.
app.delete('/api/libros/:libro', function(req, res) {  
    console.log("app.delete libros");
    Libro.remove({
        _id: req.params.libro
    }, function(err, libro) {
        if(err){
            res.send(err);
        }

        Libro.find(function(err, libros) {
            if(err){
                res.send(err);
            }
            res.json(libros);
        });

    })
});

// Carga una vista HTML simple donde irá nuestra Single App Page
// Angular Manejará el Frontend
app.get('*', function(req, res) {  
    res.sendfile('./public/index.html');                
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
// Escucha en el puerto 8080 y corre el server
app.listen(8080, function() {  
    console.log('Liberbook corriendo en 8080');
});