let productosDisplay = document.getElementById('productos')
let consultasDisplay = document.getElementById('consultas')
let correosDisplay = document.getElementById('correosDisplay')
let noticiasDisplay = document.getElementById('noticias')
function borrar() {
    alert("Eliminado")
}

function productos() {
    productosDisplay.style.display = 'block';
    consultasDisplay.style.display = 'none';
    correosDisplay.style.display = 'none'
    noticiasDisplay.style.display = 'none'
}

function consultas() {
    consultasDisplay.style.display = 'block';
    productosDisplay.style.display = 'none';
    correosDisplay.style.display = 'none'
    noticiasDisplay.style.display = 'none'
}
function correos(){
    consultasDisplay.style.display = 'none';
    productosDisplay.style.display = 'none';
    correosDisplay.style.display = 'block';
    noticiasDisplay.style.display = 'none'
}

function noticias2(){
    consultasDisplay.style.display = 'none';
    productosDisplay.style.display = 'none';
    correosDisplay.style.display = 'none';
    noticiasDisplay.style.display = 'block'
}