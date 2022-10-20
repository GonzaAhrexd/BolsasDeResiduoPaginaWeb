const edit = document.getElementById('edicion') 
const datos = document.getElementById('datos')


function editar(){
    datos.style.display = 'none'
    edit.style.display = 'block'
}

function cancelar(){
    datos.style.display = 'block'
    edit.style.display = 'none'
}

