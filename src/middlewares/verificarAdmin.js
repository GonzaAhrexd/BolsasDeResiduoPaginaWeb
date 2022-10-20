const { Schema, model } = require('mongoose'); //Módulo para usar MongoDB
const usuarios = require('../models/usuarios.js')

module.exports = async (req,res,next) => {
    if(req.isAuthenticated()){
        
        if(req.user.admin)
        return next()
    }
    res.redirect('/login')

}