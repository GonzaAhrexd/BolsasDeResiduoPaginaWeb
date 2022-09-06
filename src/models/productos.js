// https://www.youtube.com/watch?v=R4eLKuzg2WU

const mongoose = require('mongoose');

//const { default: mongoose } = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: {
        type:  String,
        required: true,
        unique: true
    },
    descripcion: {
        type:  String,
        required: true,
    },
    img: {
        type:  String,
        required: true
    },
    enCarrito: {
        type:  Boolean,
        default: false
    },
    precio: {
        type:  Number,
        required: true
    },

})

const productos = mongoose.model('producto', ProductoSchema)
module.exports = productos;