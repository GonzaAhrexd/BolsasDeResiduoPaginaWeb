const mongoose = require('mongoose');
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
        default: null
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