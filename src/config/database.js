 //Variables de entorno
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, './dbconfig.env')
})

const mongoose = require ('mongoose') //Librería mongoose

//Variables de entorno
const user = process.env.user
const pass = process.env.pass
const dbName = process.env.dbName

//Ruta de conexión a la base de datos
const uri = `mongodb+srv://${user}:${pass}@cluster0.uijihcv.mongodb.net/${dbName}?retryWrites=true&w=majority`;
 
//Conexión a la base de datos
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('Conectado a MongoDB Cloud')) 
  .catch(e => console.log('error de conexión', e))
    
