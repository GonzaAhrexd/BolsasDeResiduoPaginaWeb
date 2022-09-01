require('dotenv').config();

const express = require('express')
const app = express()
const path = require('path'); //Módulo de node para reconocer directorios del sistema en el que se encuentra (Windows o Linux)
const bodyParser = require("body-parser");

const { Schema, model } = require('mongoose');


//Configuraciones
let port = process.env.PORT || 3000; //Conectarnos al puerto 3000
console.log("todo listo")
app.listen(port)
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set("view engine", "ejs") //Permitir el uso de ejs
app.use(bodyParser.urlencoded({ extended: true }))

//Middlewares https://www.youtube.com/watch?v=-bI0diefasA, https://www.youtube.com/watch?v=g32awc4HrLA



//Rutas

app.use(require('./routes/'));

//Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Base de datos

require("./database.js")

const consultas = require('./models/consultas.js');



//Consultas
app.post("/Contacto", function (req, res) {
  let nuevaConsulta = new consultas({
    nombre: req.body.nombre,
    telefono: req.body.telefono,
    email: req.body.email,
    asunto: req.body.asunto,
    mensaje: req.body.mensaje

  });
  nuevaConsulta.save();

  res.redirect('/Contacto')

})

//Correos
const correos = require('./models/correos.js');
app.post("/", function (req, res) {
  let nuevoCorreo = new correos({
    correo: req.body.correo,
  });
  nuevoCorreo.save();
  res.redirect('/')

})

//Controladores Carrito de compras
const controllers = require("./controllers")

app.get("/products", controllers.getProducts);
app.get("/products-cart", controllers.getProductsCart);

// /* POST */
app.post("/products-cart", controllers.addProductCart);

// /* PUT */
 app.put("/products-cart/:productId", controllers.putProduct);

// /* DELETE */
app.delete("/products-cart/:productId", controllers.deleteProduct);
