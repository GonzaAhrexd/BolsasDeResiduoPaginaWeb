require('dotenv').config();

const mongoose = require ('mongoose')
const user = 'admin';
const pass = 'simon123';
const dbName = 'BolsasResiduo';



const uri = `mongodb+srv://${user}:${pass}@cluster0.uijihcv.mongodb.net/${dbName}?retryWrites=true&w=majority`;
 
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))
    