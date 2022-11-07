const express = require('express')
const router = express.Router()
const { authenticate } = require('passport');
const verificarAdmin = require('../middlewares/verificarAdmin.js');
//Index
const verificarSesion = require('../middlewares/verificarSesion.js')

router.get('/', (req, res) => {
    let usuarioLogeado = " "
    let estaLog = false
    if (req.isAuthenticated()) {
        usuarioLogeado = req.user
        estaLog = true
    }
    res.render('index.html',
        {
            title: 'S.O.S Empresa Simulada',
            usuario: usuarioLogeado,
            estaLog: estaLog
        }
    )
})

//Login
router.get('/login', (req, res) => {
    let usuarioLogeado = " "
    let estaLog = false
    if (req.isAuthenticated()) {
        usuarioLogeado = req.user
        estaLog = true
    }
    res.render('login.html',
        { title: 'Login', mensajes: req.flash("mensajes") }
    )
})

//Contacto

router.get('/Contacto', async (req, res) => {
    let usuarioLogeado = " "
    let estaLog = false
    if (req.isAuthenticated()) {
        usuarioLogeado = await usuarios.findOne({ email: req.user.email })
        estaLog = true
    }
    res.render('contact.html',
        {
            title: 'Contacto',
            usuario: usuarioLogeado,
            estaLog: estaLog
        }
    )

})

//404
router.get('/404', (req, res) => {
    let usuarioLogeado = " "
    let estaLog = false
    if (req.isAuthenticated()) {
        usuarioLogeado = req.user
        estaLog = true
    }
    res.render('404.html',
        {
            title: 'not found',
            usuario: usuarioLogeado,
            estaLog: estaLog
        }
    )
})

//Nosotros
router.get('/nosotros', (req, res) => {
    let usuarioLogeado = " "
    let estaLog = false
    if (req.isAuthenticated()) {
        usuarioLogeado = req.user
        estaLog = true
    }
    res.render('about.html',
        {
            title: 'Nosotros',
            usuario: usuarioLogeado,
            estaLog: estaLog
        }
    )
})

//Noticias

const noticias = require('../models/noticias.js');
router.get('/Noticias', (req, res) => {
    let usuarioLogeado = " "
    let estaLog = false
    if (req.isAuthenticated()) {
        usuarioLogeado = req.user
        estaLog = true
    }
    noticias.find({}, function (err, noticias) {
        res.render('news.html',
            {
                title: 'Noticias',
                noticiasList: noticias,
                usuario: usuarioLogeado,
                estaLog: estaLog
            }
        )
    })
})


router.get(`/noticia-detalles/:titulo`, async (req, res) => {
    let usuarioLogeado = " "
    let estaLog = false
    if (req.isAuthenticated()) {
        usuarioLogeado = req.user
        estaLog = true
    }
    try {
        let noticiaExistente = await noticias.findOne({ titulo: req.params.titulo.replace(/-/g, " ") })
        if (noticiaExistente) {
            noticias.find({}, function (err, noticias) {
            res.render('single-news.html',
                {
                    title: noticiaExistente.titulo,
                    noticiasMostrar: noticiaExistente,
                    usuario: usuarioLogeado,
                    estaLog: estaLog,
                    noticiasTodo: noticias
                })
            })
            }
        else {
            throw new Error('Noticia no existe')
        }
    }
    catch (Error) {
        res.render('404.html',
            {
                title: 'La página no existe',
                usuario: usuarioLogeado,
                estaLog: estaLog
            })
    }
})


router.get('/contact', (req, res) => {
    let usuarioLogeado = " "
    let estaLog = false
    if (req.isAuthenticated()) {
        usuarioLogeado = req.user
        estaLog = true
    }
    res.render('contact.html',
        {
            title: 'Contacto',
            usuario: usuarioLogeado,
            estaLog: estaLog
        }
    )
})

const consultas = require('../models/consultas.js');
const correos = require('../models/correos.js');
const pedidos = require('../models/pedidos.js')
router.get('/admin', verificarAdmin, async (req, res) => {
    let usuarioLogeado = " "
    let estaLog = false

    if (req.isAuthenticated()) {
        usuarioLogeado = await usuarios.findOne({ email: req.user.email })
        estaLog = true
    }




    usuarios.find({}, function (err, usersAdmin) {
        consultas.find({}, function (err, consultas) {
            correos.find({}, function (err, correos) {
                productos.find({}, function (err, productos) {
                    noticias.find({}, function (err, noticias) {
                        pedidos.find({}, function (err, pedido) {
                            res.render('adminView.ejs',
                                {
                                    title: 'Admin',
                                    consultasList: consultas,
                                    correosList: correos,
                                    productosList: productos,
                                    noticiasList: noticias,
                                    usuario: usuarioLogeado,
                                    pedidos: pedido,
                                    estaLog: estaLog,
                                    userAdmin: usersAdmin,
                                    mensajes: req.flash("mensajes")
                                }
                            )
                        })
                    })
                })
            })
        })
    })
})


const productos = require('../models/productos.js');
const { default: mongoose } = require('mongoose');

router.get('/tienda', async (req, res) => {
    let usuarioLogeado = " "
    let estaLog = false
    if (req.isAuthenticated()) {
        usuarioLogeado = await usuarios.findOne({ email: req.user.email })
        estaLog = true
    }
    productos.find({}, function (err, productos) {
        res.render('shop2.ejs',
            {
                title: 'Tienda',
                productosList: productos,
                usuario: usuarioLogeado,
                estaLog: estaLog
            }
        )
    })
})

//Logout
router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})

const usuarios = require('../models/usuarios.js');
router.get('/perfil', verificarSesion, async (req, res) => {
    let usuarioLogeado = ""
    let pedidosUser = []
    let estaLog = false
    if (req.isAuthenticated()) {
        usuarioLogeado = await usuarios.findOne({ email: req.user.email })
        estaLog = true
        pedidosUser = await pedidos.find({email: req.user.email})
    }
    res.render('perfil.html',
        {
            title: 'Perfil de Usuario',
            usuario: usuarioLogeado,
            pedidosUser: pedidosUser,
            estaLog: estaLog,
            mensajes: req.flash("mensajes")
        })
}
)

module.exports = router;