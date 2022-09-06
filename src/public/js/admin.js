let productosDisplay = document.getElementById('productos')
let consultasDisplay = document.getElementById('consultas')
let correosDisplay = document.getElementById('correosDisplay')

function borrar() {
    alert("Eliminado")
}

function productos() {
    productosDisplay.style.display = 'block';
    consultasDisplay.style.display = 'none';
    correosDisplay.style.display = 'none'
}

function consultas() {
    consultasDisplay.style.display = 'block';
    productosDisplay.style.display = 'none';
    correosDisplay.style.display = 'none'
}
function correos(){
    consultasDisplay.style.display = 'none';
    productosDisplay.style.display = 'none';
    correosDisplay.style.display = 'block';

}