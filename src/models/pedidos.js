const mongoose = require('mongoose');
const CarritoSchema= new mongoose.Schema({
    nombre: {
        type:  String,
        required: true,
    },
    email: {
        type:  String,
        required: true,
    },
    telefono: {
        type:  String,
        required: true,
    },
    provincia: {
        type:  String,
        required: true,
    },
    localidad: {
        type:  String,
        required: true,
    },
    direccion: {
        type:  String,
        required: true,
    },
    postal: {
        type:  String,
        default: false
    },
    productos: {
        type:  String,
        required: true,
    },
    precio: {
        type:  Number,
        required: true
    },
},
    {
        timestamps: true
})

const carrito = mongoose.model('pedidos', CarritoSchema)
module.exports = carrito;
