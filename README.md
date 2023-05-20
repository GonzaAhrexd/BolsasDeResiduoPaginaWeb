# Proyecto Final - S.O.S Srl

![Logo de S.O.S Srl](https://cdn.discordapp.com/attachments/740761148642689055/1109280281036337172/logo.png)

## Descripción

Este es el proyecto final realizado en el último año de cursado de la E.E.T n°24  "Simon de Iriondo". Consiste en una página web que simula la presencia de una empresa llamada S.O.S Srl, dedicada a la producción y venta de bolsas ecológicas. La página web está desarrollada utilizando Node.js y MongoDB como base de datos.

# Pruebalo
* https://sos-empresa-simulada.g0nz4codderar.repl.co/

## Características
### Como usuario
- Registro de usuarios: Los usuarios pueden crear una cuenta en la página web proporcionando su nombre, dirección de correo electrónico y contraseña. Se utiliza la autenticación basada en sesiones para permitir que los usuarios accedan a sus cuentas y realicen acciones específicas.

- Catálogo de productos: La página web muestra un catálogo de productos de bolsas ecológicas disponibles para su compra. Cada producto tiene información detallada, como su nombre, descripción y precio.

- Carrito de compras: Los usuarios pueden agregar productos al carrito de compras y realizar pedidos. El carrito de compras muestra una lista de los productos seleccionados, el precio total y la opción de finalizar la compra.

- Gestión de pedidos: Los usuarios pueden ver el historial de pedidos realizados y el estado actual de cada pedido. Los administradores del sitio tienen acceso adicional para administrar los pedidos y actualizar su estado.

- Noticias: Los usuarios pueden ver las noticias publicadas en la página web. Mantente al tanto de las últimas novedades y actualizaciones relacionadas con la empresa S.O.S Srl y el mundo del reciclaje.

- Acerca de: Obtén información extra sobre la empresa y los distintos departamentos involucrados en la producción y venta de bolsas. Conoce la historia de S.O.S Srl y su compromiso con el medio ambiente.

- Contacto: Encuentra información de contacto de la empresa para cualquier consulta, duda o solicitud. Puedes comunicarte con nosotros mediante esta página, o por correo electrónico, teléfono o visitando nuestras instalaciones físicas.

### Panel de Administrador

Panel para acceder a distintos datos de la base de datos, actúa como un crud, solo disponible teniendo una cuenta de administrador:

- Productos:  Se puede agregar nuevos productos, así como modificarlos y eliminarlos.

- Consultas: Se pueden revisar las consultas realizadas por los usuarios.

- Correos: Se puede consultar correos que se hayan suscrito a las novedades.

- Noticias: Se pueden agregar, modificar o eliminar las noticias.

- Pedidos: Se puede revisar los pedidos realizados  por los usuarios en la página.

- Administradores: Se puede otorgar permisos de administrador

## Algunas capturas
<div>

![Página de Inicio](https://cdn.discordapp.com/attachments/740761148642689055/1109274225472180254/image.png)
![Tienda](https://cdn.discordapp.com/attachments/740761148642689055/1109275062906920970/image.png)
![Noticias](https://cdn.discordapp.com/attachments/740761148642689055/1109275721379106926/image.png)
![Panel de Admin](https://cdn.discordapp.com/attachments/740761148642689055/1109276573401612350/image.png)

</div>

## Tecnologías utilizadas

- HTML
- CSS
- SCSS
- Bootstrap
- JavaScript
- Node.js
- Express
- MongoDB

### Librerías de Node utilizadas

- bcrypt
- body-parser
- connect-flash
- cookie-parser
- cors
- dotenv
- ejs
- express
- express-fileupload
- express-handlebars
- express-sessions
- express-unless
- express-validator
- formidable
- method-override
- mongoose
- mongoose-unique-validator
- morgan
- nodemon
- passport


## Instalación

0. Debes tener conocimientos minimos en cómo conectar a una base de datos de MongoDB.

1. Clona este repositorio en tu máquina local.

```bash
git clone https://github.com/GonzaAhrexd/BolsasDeResiduoPaginaWeb
```
2. Ve al directorio del proyecto.
3. Instala las dependencias del proyecto.

```bash
npm install

```

4. Configura las variables de entorno para las sesiones
- Ve a la carpeta src en donde se encuentre el index.js y agrega un archivo llamado "sessionconfig.env" y asigna las variables de entorno para la sesión, aquí puedes poner cualquier valor
<div align="center">

![Ruta en donde poner el archivo](https://cdn.discordapp.com/attachments/740761148642689055/1109283176737673226/image.png)

</div>
```sessionconfig.env
secret=nombre
name=secret-name-nombre
```
5. Configura las variables de entorno para la base de datos en MongoDB
<div align="center">

[!Ruta en donde poner el  archivo](https://cdn.discordapp.com/attachments/740761148642689055/1109282521579008100/image.png)

</div>
* Si estás usando mongoDB Cloud, agrega un archivo "dbconfig.env" dentro de  ./src/config

```dbconfig.env
user = nombredeusuario
pass = contraseñademongodb
dbName = nombredelacolección

```

* Si lo estás usando de manera local, ve al archivo database.js y remplaza la constante uri por tu conexión local, los  demás valores los puedes eliminar y quedaría como: 

```javascript
const mongoose = require ('mongoose')
const uri = 'mongodb://localhost:27017/nombre_de_la_base_de_datos';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('Conectado a MongoDB Cloud')) 
  .catch(e => console.log('error de conexión', e))
```

5. Inicia la aplicación.

```bash
npm start
```
6. Accede a la página web en tu navegador.

http://localhost:3000

