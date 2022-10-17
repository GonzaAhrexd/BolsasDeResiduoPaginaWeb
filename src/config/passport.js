const LocalStrategy = require('passport-local').Strategy

const passport = require('passport')
const usuarios = require('../models/usuarios.js')

module.exports = function (pass) {
    passport.serializeUser(function (usuarios, done) {
        done(null, usuarios.id)
    })

    passport.deserializeUser(function (id, done) {
        usuarios.findById(id, function (err, usuarios) {
            done(err, usuarios)
        })
    })
    //Reg


    passport.use('local-signup', new LocalStrategy({
        usernameField: 'name',
        emailField: 'email',
        passwordField: 'pass',
        passReqToCallback: true

    },
        function (req, email, pass, done) {
            usuarios.findOne({ 'email': email }, function (err, usuarios) {
                if (err) { return done(err); }
                if (usuarios) {
                    return done(null, false, req.flash('signupMessage', 'Email ya tomado'))
                }
                else {
                    var newUsuario = new usuarios()
                    newUser.email = email;
                    newUser = newUser.generateHash(pass)
                    newUser.save(function (err) {
                        if (err) { throw err }
                        return done(null, newUsuario)
                    })
                }
            })
        }))


//Log
passport.use('local-login', new LocalStrategy({
    usernameField: 'name',
    emailField: 'email',
    passwordField: 'pass',
    passReqToCallback: true

},
    function (req, email, pass, done) {
        usuarios.findOne({ 'email': email }, function (err, usuarios) {
            if (err) { return done(err); }
            if (!usuarios) {
                return done(null, false, req.flash('loginMessage', 'Usuario no encontrado'))
            }
           if(!user.validatePassword(pass)){
            return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta'))
           }
           return done(null, user)
            })

        }))
        
}
