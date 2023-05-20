const mongoose = require('mongoose');
const ConsultasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    asunto: {
        type: String,
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },

})
const consulta = mongoose.model('consultas', ConsultasSchema)
module.exports = consulta;
