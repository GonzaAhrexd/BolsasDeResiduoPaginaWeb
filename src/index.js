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
const { body, validationResult } = require('express-validator')
const formidable = require('formidable');
const fs = require('fs')
//Configuraciones
let port = process.env.PORT || 3000; //Conectarnos al puerto 3000
console.log("Servidor funcionando en puerto " + port)

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


passport.serializeUser((user, done) => done(null, { id: user.id, name: user.name, email: user.email }))
passport.deserializeUser(async (user, done) => {
  const userDB = await usuarios.findById(user.id)
  return done(null, { id: userDB.id, name: userDB.name, email: userDB.email, admin: userDB.admin })
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
app.post("/productos/agregar", function (req, res) {
  const form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {

    try {
      if (err) {
        throw new Error("Falló")
      }
      const file = files.imagen
    
      if (file.originalFilename === "") {
        throw new Error("Agrega una imagen")
      }
      if (!(file.mimetype === "image/jpeg" || file.mimetype === "image/png")) {
        throw new Error("Formato no válido, prueba con .png o .jpg")
      }

      if (file.size > 50 * 1024 * 1024) {
        throw new Error("Ingrese un archivo de menos de 50mb")
      }
      let dirFile = path.join(__dirname, `./public/img/productos/${file.originalFilename}`)

      fs.copyFile(file.filepath, dirFile, function (err) {
        if (err) throw err;
        // req.flash('Archivo subido');
        // res.end();
      });
      req.flash("mensajes", [{ msg: "Archivo subido" }])
      let nuevo = files.imagen.originalFilename

      let nuevoProducto = new productos({
        nombre: fields.producto,
        img: nuevo,
        precio: fields.precio,
        descripcion: fields.description,
      });
      nuevoProducto.save();
    }
    catch (error) {
      req.flash("mensajes", [{ msg: error.message }])
    }
    finally {
      res.redirect('/admin')
    }
  })

  // res.redirect('/admin')
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

//Agregar
app.post("/admin/noticias", async function (req, res) {
  const form = new formidable.IncomingForm()


  form.parse(req, async (err, fields, files) => {

    try {

      if (err) {
        throw new Error("Falló")
      }
      let noticiaExistente = await noticias.findOne({ titulo: fields.titulo })
      if (noticiaExistente) {
        throw new Error('Noticia ya creada')
      }
      const file = files.img

      if (file.originalFilename === "") {
        throw new Error("Agrega una imagen")
      }
      if (!(file.mimetype === "image/jpeg" || file.mimetype === "image/png")) {
        throw new Error("Formato no válido, prueba con .png o .jpg")
      }

      if (file.size > 50 * 1024 * 1024) {
        throw new Error("Ingrese un archivo de menos de 5mb")
      }

      let dirFile = path.join(__dirname, `./public/img/noticias/${file.originalFilename}`)

      fs.copyFile(file.filepath, dirFile, function (err) {
        if (err) throw err;
        // req.flash('Archivo subido');
        // res.end();
      });


      req.flash("mensajes", [{ msg: "Archivo subido" }])
      let nuevo = files.img.originalFilename
      let nuevaNoticia = await new noticias({
        titulo: fields.titulo,
        resumen: fields.resumen,
        texto: fields.texto,
        img: nuevo,
        publicador: fields.publicador,
      });
      await nuevaNoticia.save();
    }
    catch (error) {
      req.flash("mensajes", [{ msg: error.message }])
    }
    finally {
      res.redirect('/admin')
    }
  })



})

//Editar

app.post("/noticias/editar/:id", async function (req, res) {

  try {
    await noticias.findByIdAndUpdate(req.params.id, {
      titulo: req.body.titulo.trim(),
      resumen: req.body.resumen.trim(),
      texto: req.body.texto.trim(),
      publicador: req.body.publicador.trim(),
    })
    res.redirect('/admin')
  }
  catch (error) {
    return res.redirect('/')
  }
})


//Usuarios
//Login registro

const usuarios = require('./models/usuarios.js');


app.post("/login/register", [
  body("nameREG", "Ingrese un nombre válido").trim().notEmpty().escape(),
  body("emailREG", "Ingrese un email válido").trim().isEmail().normalizeEmail(),
  body("passREG", "Contraseña no válida")
    .trim()
    .isLength({ min: 6 })
    .escape()
    .custom((value, { req }) => {
      if (value !== req.body.pass2REG) {
        throw new Error('No coincide las contraseñas')
      }
      else {
        return value;
      }
    })
],

  async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
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
      req.flash("mensajes", [{ msg: Error.message }])
      return res.redirect('/login')
    }
  })

//Usuarios Autenticación

app.post("/login/auth", [
  body("emailLOG", "Ingrese un email válido").trim().isEmail().normalizeEmail()
], async function (req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.flash("mensajes", errors.array())
    return res.redirect('/login')
  }

  const { emailLOG, passLOG } = req.body

  try {
    const user = await usuarios.findOne({ email: emailLOG })
    if (!user) throw new Error('Usuario no existente')

    if (!(await user.comparePass(passLOG))) {
      throw new Error('Contraseña incorrecta')
    }
    else {
      req.login(user, function (err) {
        if (err) throw new Error('Error al crear la sesión')

        return res.redirect('/')
      })

    }
  } catch (Error) {
    req.flash("mensajes", [{ msg: Error.message }])
    return res.redirect('/login')
    // res.json({ Error: Error.message })
  }
})


//Editar perfil

app.post("/perfil/edicion/:id", async function (req, res) {

  try {
    await usuarios.findByIdAndUpdate(req.params.id, {
      nombreCompleto: req.body.nombreCompleto.trim(),
      telefono: req.body.telefono.trim(),
      direccion: req.body.direccion.trim(),
      postal: req.body.postal.trim(),
      provincia: req.body.provincia.trim(),
      localidad: req.body.localidad.trim()
    })
    res.redirect('/perfil')
  }
  catch (error) {

    return res.redirect('/')

  }
})


app.post("/productos/editar/:id", async function (req, res) {

  try {
    await productos.findByIdAndUpdate(req.params.id, {
      nombre: req.body.nombre.trim(),
      precio: req.body.precio.trim(),
      descripcion: req.body.descripcion.trim(),
    })
    res.redirect('/admin')
  }
  catch (error) {
    return res.redirect('/')
  }
})

app.post("/admin/agregar", async function (req, res) {

  try {
    let a = await usuarios.findOne({email: req.body.correoNuevoAdmin})
    console.log(a.name)

    await usuarios.findOneAndUpdate({ email: req.body.correoNuevoAdmin },{
      admin: true
    })
    res.redirect('/admin')
  }
  catch (error) {
    req.flash("mensajes", [{ msg: "No existe este correo" }])
    return res.redirect('/admin')
  }

})

app.post("/admin/eliminar/:id", async function (req, res) {
  try {
    await usuarios.findByIdAndUpdate(req.params.id, {
      admin: false
    })
    res.redirect('/admin')
  }
  catch (error) {
    return res.redirect('/')
  }
})

const pedido = require('./models/pedidos.js');
app.post("/tienda/checkout", function (req, res) {
  let nuevoPedido = new pedido({
    nombre: req.body.nombre,
    email: req.body.email,
    telefono: req.body.telefono,
    provincia: req.body.provincia,
    localidad: req.body.localidad,
    direccion: req.body.direccion,
    postal: req.body.codPos,
    productos: req.body.productos,
    precio: req.body.precio,
  });
  nuevoPedido.save();
  res.redirect('/tienda')
})
