const express = require('express')
const router = express.Router()

//Index


router.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    res.render('index.html',
        { title: 'S.O.S Empresa Simulada' }
    )
})
router.get('/login', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    res.render('login.html',
        { title: 'Login' }
    )
})
//Contacto
router.get('/Contacto', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    res.render('contact.html',
        { title: 'Contacto' }
    )

})


//404

router.get('/404', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    res.render('404.html',
        { title: 'not found' }
    )
})

//Acerca de
router.get('/Acercade', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    res.render('about.html',
        { title: 'Acerca de' }
    )
})

//Index 2
router.get('/index_2', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    res.render('index_2.html',
        { title: 'Index2' }
    )
})


//Tienda

// router.get('/Tienda', (req, res) => {
//     //res.sendFile(path.join(__dirname + "/views/index.ejs"));
//     res.render('shop.html',
//         { title: 'Tienda' }
//     )
// })

//Noticias

const noticias = require('../models/noticias.js');

router.get('/Noticias', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    noticias.find({}, function (err, noticias) {
        res.render('news.html',
            {
                title: 'Noticias',
                noticiasList: noticias
            }
        )
    })
})



router.get('/Noticias-2', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    res.render('single-news.html',
        { title: 'Noticias' }
    )
    crearRutas();
})

router.get('/contact', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    res.render('contact.html',
        { title: 'Contacto' }
    )
    console.log('POST /contact')
    console.log(req.body)
})

//Mail

router.get('/mail', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    res.render('mail.html',
        { title: 'Mail' }
    )
})

//Tienda

router.get('/pago', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    res.render('checkout.html',
        { title: 'Pago' }
    )
})



router.get('/carro', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    res.render('cart.html',
        { title: 'Carro' }
    )
})

const consultas = require('../models/consultas.js');
const correos = require('../models/correos.js');

router.get('/admin', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
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
const { default: mongoose } = require('mongoose')

router.get('/tienda', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    productos.find({}, function (err, productos) {
        res.render('shop2.ejs',
            {
                title: 'Tienda',
                productosList: productos
            }
        )
    })


})

router.get('/noticia-detalles', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    res.render('shop2.ejs',
        {
            title: 'noticias',
        })
})


router.get(`/noticia-detalles/:titulo`, (req, res) => {
    
    noticias.findOne({titulo: req.params.titulo.replace(/-/g, " ")}, function (err, noticia) {
        res.render('single-news.html',
        {
            title: noticia.titulo,
            noticiasMostrar: noticia,
        }      
    )
  
     
})

})
  

/** 
 * async function crearRutas(){
    await noticias.find({}, function (err, noticias) {
        console.log(noticias);

        noticias.forEach(noticia => {
            router.get(`/noticia-detalles/:noticia`, (req, res) => {

                res.render('single-news.html',

                    {
                        title: noticia.titulo,
                        noticiasMostrar: noticia,
                    }
                )
            });
        })
    })
}
 */


/* 
noticias.find({}, function (err, noticias) {
    noticias.forEach(noticia => {
        router.get(`/noticia-detalles/${noticia.titulo.replace(/ /g, "")}`, (req, res) => {
 
    
        res.render('single-news.html',
            {
                title: noticia.titulo,
                noticiasMostrar: noticia,
            }
        ) 
    });
})
})*/

module.exports = router;