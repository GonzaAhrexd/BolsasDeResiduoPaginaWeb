const mongoose = require('mongoose');
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
    precio: {
        type:  Number,
        required: true
    },

})


const productos = mongoose.model('producto', ProductoSchema)
module.exports = productos;