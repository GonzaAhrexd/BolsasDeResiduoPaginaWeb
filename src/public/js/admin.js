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
function correos() {
    consultasDisplay.style.display = 'none';
    productosDisplay.style.display = 'none';
    correosDisplay.style.display = 'block';
    noticiasDisplay.style.display = 'none'
    administradorDisplay.style.display = 'none'
    document.documentElement.scrollTop = 855
}

function noticias2() {
    consultasDisplay.style.display = 'none';
    productosDisplay.style.display = 'none';
    correosDisplay.style.display = 'none';
    noticiasDisplay.style.display = 'block'
    administradorDisplay.style.display = 'none'
    document.documentElement.scrollTop = 855
}

function admin() {
    consultasDisplay.style.display = 'none';
    productosDisplay.style.display = 'none';
    correosDisplay.style.display = 'none';
    noticiasDisplay.style.display = 'none'
    administradorDisplay.style.display = 'block'
    document.documentElement.scrollTop = 855
}

const editarBoton = document.querySelectorAll('#edit')
const editarCosa = document.querySelectorAll('#editar')
const editarCancelar = document.querySelectorAll('#cancelEdit')
const editarGuardar = document.querySelectorAll('.save')
const editarEliminar = document.querySelectorAll('.delete')

editarCancelar.forEach(edicionCancel => {
    edicionCancel.addEventListener('click', cancelar)
})

editarBoton.forEach(edicion => {
    edicion.addEventListener('click', editar)
})
function editar() {
    editarBoton.forEach(edicion => {
        edicion.style.display = "none"
    })
    editarCancelar.forEach(cancelar => {
        cancelar.style.display = "block"
    })
    editarCosa.forEach(editarr => {
        editarr.style.borderColor = 'black'
        editarr.readOnly = false
    })
    editarGuardar.forEach(editarS => {
        editarS.style.display = 'block'
    })
    editarEliminar.forEach(editarS => {
        editarS.style.display = 'block'
    })
}

function cancelar() {
    editarBoton.forEach(edicion => {
        edicion.style.display = "block"
    })
    editarCancelar.forEach(cancelar => {
        cancelar.style.display = "none"
    })
    editarCosa.forEach(editarr => {
        editarr.style.borderColor = 'transparent'
        editarr.readOnly = true
    })
    editarGuardar.forEach(editarS => {
        editarS.style.display = 'none'
    })
    editarEliminar.forEach(editarS => {
        editarS.style.display = 'none'
    })
}