const {Schema, model} = require('mongodb');

const ConsultasSchema = new Schema({
    nombre: {
        type:  String,
        required: true
    },
    telefono: {
        type:  String,
        required: false
    },
    email: {
        type:  String,
        required: true
    },
    asunto: {
        type:  String,
        required: true
    },
    mensaje: {
        type:  String,
        required: true
    },

})

module.exports = model('Consultas', ConsultasSchema)