// const {Schema, model} = require('mongodb');
const bcrypt = require('bcrypt');
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
    },
    nombreCompleto: {
        type:  String,
    },
    telefono: {
        type:  String,
    },
    direccion: {
        type:  String,
    },
    provincia: {
        type:  String,
    },
    localidad: {
        type:  String,
    },
    postal: {
        type:  String,
    },
}, 
    {
        timestamps: true
})

UsuarioSchema.pre('save', async function(next){
    const user = this
    if(!user.isModified('pass')) return next

    try{
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(user.pass,salt)
        user.pass = hashed
        next()
    }
    catch(error){
        console.log(error)
        next()
    }
})

UsuarioSchema.methods.comparePass = async function(canditePass){
    return await bcrypt.compare(canditePass, this.pass)
    
}

const usuarios = mongoose.model('usuarios', UsuarioSchema)
module.exports = usuarios;