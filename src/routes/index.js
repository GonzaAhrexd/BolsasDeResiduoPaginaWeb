const express = require('express')
const router = express.Router()

//Index

router.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    res.render('index.html',
        { title: 'S.O.S Empresa Simulada' }
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

router.get('/Noticias', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    res.render('news.html',
        { title: 'Noticias' }
    )
})

router.get('/Noticias-2', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    res.render('single-news.html',
        { title: 'Noticias' }
    )
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

router.get('/tienda/madera', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    res.render('bolsamadera.html',
        { title: 'Bolsa de Madera' }
    )
})
router.get('/tienda/madera2', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    res.render('bolsamadera2.html',
        { title: 'Bolsa de Madera' }
    )
})
router.get('/tienda/plastico', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    res.render('bolsaplastico.html',
        { title: 'Bolsa de Plástico' }
    )
})
router.get('/tienda/plastico2', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    res.render('bolsaplastico2.html',
        { title: 'Bolsa de Plástico' }
    )
})
router.get('/tienda/mandioca', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    res.render('bolsamandioca.html',
        { title: 'Bolsa de Mandioca' }
    )
})
router.get('/tienda/algodon', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    res.render('bolsaalgodon.html',
        { title: 'Bolsa de Algodon' }
    )
})
router.get('/tienda/algodon2', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    res.render('bolsaalgodon2.html',
        { title: 'Bolsa de Algodon' }
    )
})

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

router.get('/admin', (req, res) => {
    //res.sendFile(path.join(__dirname + "/views/index.ejs"));
    consultas.find({}, function (err, consultas) {
        res.render('adminView.ejs',
            {
                title: 'Admin',
                consultasList: consultas

            }
        )
    })


})

const productos = require('../models/productos.js');

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







module.exports = router;