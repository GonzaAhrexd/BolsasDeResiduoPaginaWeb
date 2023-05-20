const { Schema, model } = require('mongoose'); //Módulo para usar MongoDB
const usuarios = require('../models/usuarios.js')
const flash = require('connect-flash') //Módulo flash 

module.exports = async (req,res,next) => {
    if(req.isAuthenticated()){
        
        if(req.user.admin) //Verificación si el usuario es administrador
        return next()  
}


    req.flash("mensajes", [{msg: "No cuenta con permisos de administrador"}])
    return res.redirect('/perfil')
}

