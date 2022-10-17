// const {Schema, model} = require('mongodb');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose')
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

// UsuarioSchema.methods.encryptPassword = async password =>{
//     const salt = await bcrypt.genSalt(10);
//     return await bcrypt.hash(password, salt);

// };

// UsuarioSchema.methods.matchPassword = async function(password){
//     await bcrypt.compare(password, this.password);
    
// }

const usuarios = mongoose.model('usuarios', UsuarioSchema)
module.exports = usuarios;