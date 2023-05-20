const { Schema, model } = require('mongoose'); //Módulo para usar MongoDB
const usuarios = require('../models/usuarios.js')

module.exports = async (req,res,next) => {
    if(req.isAuthenticated()){ //Verifiación si el usuario está logeado
        return next()
    }
    
    res.redirect('/login')
}