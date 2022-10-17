// const {Schema, model} = require('mongodb');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const { serializeUser } = require('passport');
const UsuarioSchema = new mongoose.Schema({
    name: {
        type:  String,
        required: true
    },
    email: {
        type:  String,
        required: true
    },
    pass: {
        type:  String,
        required: true
          },
    admin: {
        type:  Boolean
    }
}, 
    {
        timestamps: true
})

UsuarioSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSalt(8), null)

}


UsuarioSchema.methods.matchPassword = function(pass){
    return bcrypt.compare(pass, this.local.pass);
    
}

const usuarios = mongoose.model('usuarios', UsuarioSchema)
module.exports = usuarios;