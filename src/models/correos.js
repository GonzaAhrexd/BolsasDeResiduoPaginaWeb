const mongoose = require('mongoose');

//const { default: mongoose } = require('mongoose');

const CorreosSchema = new mongoose.Schema({
    correo: {
        type:  String
    },
},
{
    timestamps: true


})



const correos = mongoose.model('correos', CorreosSchema)


module.exports = correos;