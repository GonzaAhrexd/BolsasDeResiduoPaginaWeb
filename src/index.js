// https://www.youtube.com/watch?v=-bI0diefasA, https://www.youtube.com/watch?v=g32awc4HrLA
const express = require('express') //Framework JavaScript
const app = express()
const path = require('path'); //Módulo de node para reconocer directorios del sistema en el que se encuentra (Windows o Linux)
const bodyParser = require("body-parser");
const methodOverride = require("method-override")
const { Schema, model } = require('mongoose'); //Módulo para usar MongoDB
const flash = require('connect-flash') //Módulo flash 
const passport = require('passport') //Módulo para Autenticar
const morgan = require('morgan') //Módulo para metodos https
const session = require('express-session') //Módulo session
const cookieParser = require('cookie-parser') //Módulo para administrar Cookies
const {body, validationResult} = require('express-validator')
//Configuraciones
let port = process.env.PORT || 3000; //Conectarnos al puerto 3000
console.log("Servidor funcionando en puerto "+port)

app.listen(port)
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set("view engine", "ejs") //Permitir el uso de ejs

// require('./config/passport.js')(passport)

//Middlewares
app.use(methodOverride('_method'));
// app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))

require('dotenv').config({
  path: path.resolve(__dirname, './sessionconfig.env')
})

app.use(
  session({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: false,
  name: process.env.name
}))
app.use(flash());  

app.use(passport.initialize())
app.use(passport.session())


passport.serializeUser((user, done) => done(null, {id: user.id, name: user.name, email: user.email})) 
passport.deserializeUser(async(user,done)=>{
  const userDB = await usuarios.findById(user.id)
  return done(null, {id: userDB.id, name: userDB.name, email: userDB.email, admin: userDB.admin})
})
//req.user
// Rutas
app.use(require('./routes/'));
//Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Base de datos
require("./config/database.js")
const consultas = require('./models/consultas.js');
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


const deleteNote = async (req, res) => {
  await consultas.findByIdAndDelete(req.params.id);
  res.redirect("/admin")
};

app.post('/consultas/eliminar/:id', deleteNote)

const productos = require('./models/productos.js');
//Productos
app.post("/admin", function (req, res) {
  let nuevoProducto = new productos({
    nombre: req.body.producto,
    img: req.body.imagen,
    precio: req.body.precio,
    descripcion: req.body.description,
  });
  nuevoProducto.save();
  res.redirect('/admin')
})

const deleteProductos = async (req, res) => {
  await productos.findByIdAndDelete(req.params.id);
  res.redirect("/admin")
};

app.post('/productos/eliminar/:id', deleteProductos)

//Correos
const correos = require('./models/correos.js');
app.post("/", function (req, res) {
  let nuevoCorreo = new correos({
    correo: req.body.correo,
  });
  nuevoCorreo.save();
  res.redirect('/')
})

const deleteMail = async (req, res) => {
  await correos.findByIdAndDelete(req.params.id);
  res.redirect("/admin")
};

app.post('/correos/eliminar/:id', deleteMail)

//Noticias
const noticias = require('./models/noticias.js');
const deleteNoticia = async (req, res) => {
  await noticias.findByIdAndDelete(req.params.id);
  res.redirect("/admin")
};

app.post('/noticias/eliminar/:id', deleteNoticia)

//Productos
app.post("/admin/noticias", function (req, res) {
  let nuevaNoticia = new noticias({
    titulo: req.body.titulo,
    resumen: req.body.resumen,
    texto: req.body.texto,
    img: req.body.img,
    publicador: req.body.publicador,
  });
  nuevaNoticia.save();
  res.redirect('/admin')
})

//Usuarios
//Login registro

const usuarios = require('./models/usuarios.js')

app.post("/login/register", [
  body("nameREG" , "Ingrese un nombre válido").trim().notEmpty().escape(),
  body("emailREG" , "Ingrese un email válido").trim().isEmail().normalizeEmail(),
  body("passREG",  "Contraseña no válida")
  .trim()
  .isLength({min: 6})
  .escape()
  .custom((value, {req}) =>{
    if(value !== req.body.pass2REG)
    {
      throw new Error('No coincide las contraseñas')
    }
    else{ 
    return value;
  }
  }) 
], 

async function (req, res) {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    req.flash("mensajes", errors.array())
    return res.redirect('/login')
  }

  const { nameREG, emailREG, passREG } = req.body;
  try {
    let userExistente = await usuarios.findOne({ email: req.body.emailREG })
    if (userExistente) {
      throw new Error('Usuario ya existe')
    }
    else {
      let nuevoUsuario = new usuarios({
        name: nameREG, email: emailREG, pass: passREG, admin: false
      });
      nuevoUsuario.save();
      res.redirect('/')
    }
  }
  catch (Error) {
    req.flash("mensajes", [{msg: Error.message}])
    return res.redirect('/login')
  }
})

//Usuarios Autenticación

app.post("/login/auth", [
  body("emailLOG" , "Ingrese un email válido").trim().isEmail().normalizeEmail()
], async function (req, res) {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    req.flash("mensajes", errors.array())
    return res.redirect('/login')
  }

  const { emailLOG, passLOG } = req.body

  try {
    const user = await usuarios.findOne({ email: emailLOG })
    if (!user) throw new Error('Usuario no existente')

    if (!(await user.comparePass(passLOG))){
       throw new Error('Contraseña incorrecta')
    }
       else{ 
    req.login(user, function(err){
      if(err) throw new Error('Error al crear la sesión')
      
      return res.redirect('/')
    })
  
  }
  } catch (Error) {
    req.flash("mensajes", [{msg: Error.message}])
    return res.redirect('/login')
    // res.json({ Error: Error.message })
  }
})


//Editar perfil

app.post("/perfil/edicion/:id",async function (req, res) {

  try{ 
  await usuarios.findByIdAndUpdate(req.params.id,{
    nombreCompleto: req.body.nombreCompleto.trim(),
    telefono: req.body.telefono.trim(),
    direccion: req.body.direccion.trim(),
    postal: req.body.postal.trim(),
    provincia: req.body.provincia.trim(),
    localidad: req.body.localidad.trim()
  })
  res.redirect('/perfil')
}
catch(error){

  return res.redirect('/')

}
})

