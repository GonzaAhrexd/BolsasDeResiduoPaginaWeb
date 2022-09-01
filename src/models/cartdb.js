const mongoose = require('mongoose');

//const { default: mongoose } = require('mongoose');

const CarritoSchema = new mongoose.Schema({
    nombre: {
        type:  String,
        required: true
    },
    img: {
        type:  String,
        required: false
    },
    precio: {
        type:  Number,
        required: true
    },
    cantidad: {
        type:  Number,
        required: true
    
    }

})

const carrito = mongoose.model('carrito', CarritoSchema)


module.exports = carrito;
