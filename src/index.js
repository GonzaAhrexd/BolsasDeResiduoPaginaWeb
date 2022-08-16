require('dotenv').config();

const express = require('express')
const app = express()
const path = require('path'); //Módulo de node para reconocer directorios del sistema en el que se encuentra (Windows o Linux)
const bodyParser = require("body-parser");

const {Schema, model} = require('mongoose');


//Configuraciones
let port = process.env.PORT || 3000; //Conectarnos al puerto 3000
console.log("todo listo")
app.listen(port) 
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set("view engine","ejs") //Permitir el uso de ejs
app.use(bodyParser.urlencoded({extended: true}))

//Middlewares https://www.youtube.com/watch?v=-bI0diefasA, https://www.youtube.com/watch?v=g32awc4HrLA



//Rutas

app.use(require('./routes/'));

//Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Base de datos

require("./database.js")

const consultas = require('./models/consultas.js');



//Consultas
app.post("/Contacto", function(req,res){
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




// app.get('/contact', (req, res) => {
//   //res.sendFile(path.join(__dirname + "/views/index.ejs"));

//   console.log('POST /contact')
//   console.log(req.body)

//   let consultas = new consultas()
//   consultas.nombre = req.body.nombre
//   consultas.telefono = req.body.telefono
//   consultas.email = req.body.email
//   consultas.asunto = req.body.asunto
//   consultas.mensaje = req.body.mensaje

//   consultas.save((err, consultasStored) => {
//   if(err) res.status(500).send({message: `Error al guardar la base de datos: ${err} `})

//   res.status(200).send({product: productStored})
//   })
  
  
// +})