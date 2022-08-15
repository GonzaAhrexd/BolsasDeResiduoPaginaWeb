require('dotenv').config();

const express = require('express')
const app = express()
const path = require('path'); //Módulo de node para reconocer directorios del sistema en el que se encuentra (Windows o Linux)

//Configuraciones
let port = process.env.PORT || 3000; //Conectarnos al puerto 3000

console.log("todo listo")

app.listen(port) 
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set("view engine","ejs") //Permitir el uso de ejs

//Middlewares https://www.youtube.com/watch?v=-bI0diefasA, https://www.youtube.com/watch?v=g32awc4HrLA



//Rutas

app.use(require('./routes/'));

//Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Base de datos

require("./database.js")