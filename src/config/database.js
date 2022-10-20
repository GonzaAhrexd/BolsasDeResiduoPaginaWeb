 //Variables de entorno
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, './dbconfig.env')
})

const mongoose = require ('mongoose')

const user = process.env.user
const pass = process.env.pass
const dbName = process.env.dbname

const uri = `mongodb+srv://${user}:${pass}@cluster0.uijihcv.mongodb.net/${dbName}?retryWrites=true&w=majority`;
 
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))
    
