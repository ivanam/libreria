var mongoose = require('mongoose');

var LibroModel = mongoose.model('LibroModel',{

    _id: String,
    title: String,
    precios_locales: [Number],
    id_google: String,
    imagen: String,
    reactions: {

        like: Number,
        angry: Number,
        sad: Number,
        haha: Number,
        wow: Number
    }
});

exports.LibroModel = LibroModel;

mongoose.connect('mongodb://localhost:27017/liberbook');