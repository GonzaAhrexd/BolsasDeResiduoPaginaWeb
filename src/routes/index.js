const express = require('express')
const router = express.Router()
const { authenticate } = require('passport');
const verificarSesion = require('../middlewares/verificarSesion.js');
//Index


router.get('/', (req, res) => {
    res.render('index.html',
        { title: 'S.O.S Empresa Simulada' }
    )
})

//Login
router.get('/login', (req, res) => {
    res.render('login.html',
        { title: 'Login', mensajes: req.flash("mensajes") }
    )
})

//Contacto

router.get('/Contacto', (req, res) => {
    res.render('contact.html',
        { title: 'Contacto' }
    )

})

//404
router.get('/404', (req, res) => {
    res.render('404.html',
        { title: 'not found' }
    )
})

//Acerca de
router.get('/Acercade', (req, res) => {
    res.render('about.html',
        { title: 'Acerca de' }
    )
})

//Noticias

const noticias = require('../models/noticias.js');
router.get('/Noticias', (req, res) => {
    noticias.find({}, function (err, noticias) {
        res.render('news.html',
            {
                title: 'Noticias',
                noticiasList: noticias
            }
        )
    })
})


router.get(`/noticia-detalles/:titulo`, async (req, res) => {
    try {
        let noticiaExistente = await noticias.findOne({ titulo: req.params.titulo.replace(/-/g, " ") })
        if (noticiaExistente) {
            res.render('single-news.html',
                {
                    title: noticiaExistente.titulo,
                    noticiasMostrar: noticiaExistente,
                })
        }
        else {
            throw new Error('Noticia no existe')
        }
    }
    catch (Error) {
        res.render('404.html',
        {
            title: 'La página no existe'
        })
    }
})


router.get('/contact', (req, res) => {
    res.render('contact.html',
        { title: 'Contacto' }
    )
})

//Tienda
router.get('/pago', (req, res) => {
    res.render('checkout.html',
        { title: 'Pago' }
    )
})


router.get('/carro', (req, res) => {
    res.render('cart.html',
        { title: 'Carro' }
    )
})

const consultas = require('../models/consultas.js');
const correos = require('../models/correos.js');

router.get('/admin', verificarSesion , (req, res) => {
    consultas.find({}, function (err, consultas) {
        correos.find({}, function (err, correos) {
            productos.find({}, function (err, productos) {
                noticias.find({}, function (err, noticias) {
                    res.render('adminView.ejs',
                        {
                            title: 'Admin',
                            consultasList: consultas,
                            correosList: correos,
                            productosList: productos,
                            noticiasList: noticias,
                        }
                    )
                })
            })
        })
    })
})


const productos = require('../models/productos.js');
const { default: mongoose } = require('mongoose');


router.get('/tienda', (req, res) => {
    productos.find({}, function (err, productos) {
        res.render('shop2.ejs',
            {
                title: 'Tienda',
                productosList: productos
            }
        )
    })
})


module.exports = router;