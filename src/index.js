
const express = require('express')
const app = express()
const path = require('path'); //Módulo de node para reconocer directorios del sistema en el que se encuentra (Windows o Linux)

//Configuraciones
let port = process.env.PORT || 3000; //Conectarnos al puerto 3000
app.listen(port) 
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set("view engine","ejs") //Permitir el uso de ejs

//Middlewares https://www.youtube.com/watch?v=-bI0diefasA, https://www.youtube.com/watch?v=g32awc4HrLA



//Rutas

app.use(require('./routes/'));
//app.use(express.static(__dirname + '/views/assets'));
//Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//console.log(express.static(__dirname + '/views/assets'));
//Prendiendo el servidor
// app.listen(app.get('port'), () => {
//     console.log('Server on port', app.get('port'))
// });
    
    
    