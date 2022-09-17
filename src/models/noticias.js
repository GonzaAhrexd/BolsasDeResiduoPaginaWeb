// https://www.youtube.com/watch?v=R4eLKuzg2WU

const mongoose = require('mongoose');

//const { default: mongoose } = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    titulo: {
        type:  String,
        required: true,
        unique: true
    },
    resumen: {
        type:  String,
        required: true,
    },
    img: {
        type:  String,
        required: true
    },
    publicador: {
        type:  String,
        required: true
    },
    texto: {
        type:  String,
        required: true,
    },
},
{
    timestamps: true
})

const noticias = mongoose.model('noticias', ProductoSchema)
module.exports = noticias;