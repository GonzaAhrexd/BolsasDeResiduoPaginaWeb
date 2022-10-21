const productosDisplay = document.getElementById('productos')
const consultasDisplay = document.getElementById('consultas')
const correosDisplay = document.getElementById('correosDisplay')
const noticiasDisplay = document.getElementById('noticias')
const administradorDisplay = document.getElementById('admin')
function borrar() {
    alert("Eliminado")
}

function productos() {
    productosDisplay.style.display = 'block';
    consultasDisplay.style.display = 'none';
    correosDisplay.style.display = 'none'
    noticiasDisplay.style.display = 'none'
    administradorDisplay.style.display = 'none'
    document.documentElement.scrollTop = 855
}

function consultas() {
    consultasDisplay.style.display = 'block';
    productosDisplay.style.display = 'none';
    correosDisplay.style.display = 'none'
    noticiasDisplay.style.display = 'none'
    administradorDisplay.style.display = 'none'
    document.documentElement.scrollTop = 855
}
function correos(){
    consultasDisplay.style.display = 'none';
    productosDisplay.style.display = 'none';
    correosDisplay.style.display = 'block';
    noticiasDisplay.style.display = 'none'
    administradorDisplay.style.display = 'none'
    document.documentElement.scrollTop = 855
}

function noticias2(){
    consultasDisplay.style.display = 'none';
    productosDisplay.style.display = 'none';
    correosDisplay.style.display = 'none';
    noticiasDisplay.style.display = 'block'
    administradorDisplay.style.display = 'none'
    document.documentElement.scrollTop = 855
}

function admin(){
    consultasDisplay.style.display = 'none';
    productosDisplay.style.display = 'none';
    correosDisplay.style.display = 'none';
    noticiasDisplay.style.display = 'none'
    administradorDisplay.style.display = 'block'
    document.documentElement.scrollTop = 855
}