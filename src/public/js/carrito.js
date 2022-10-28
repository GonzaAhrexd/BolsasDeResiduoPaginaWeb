
let carro = document.getElementById("Productos")
let objetosCarrito = []
const tabla = document.getElementById("tablaCarro")
const templateCarrito = document.getElementById('template-carrito').content
let carrito = {}
const items = document.querySelectorAll('#items')
const productos = document.getElementById('Productos')
const total = document.getElementById('Total')
const fragment = document.createDocumentFragment()
const checkout = document.getElementById('checkout')
const detalles = document.getElementById('detalles')
const TotalNuevo = document.getElementById('carritoTotal')
items.forEach(item => {
    item.addEventListener('click', e => {
        addCarrito(e)
    })
})
productos.addEventListener('click', e => {
    btnAccion(e)
})

const addCarrito = e => {
    console.log(e.target.classList.contains('boxed-btn'))
    if (e.target.classList.contains('cart-btn')) {
        setCarrito(e.target.parentElement)
    }
    if (e.target.classList.contains('imagenProducto')) {
        console.log('a')
        mostrarModal(e.target.parentElement)
    }
    if (e.target.classList.contains('boxed-btn')) {
        cerrarModal(e.target.parentElement)
        
    }
    e.stopPropagation()
}

const mostrarModal = e => {
    let mostrame = e.parentElement.parentElement.parentElement.querySelector('.modal')
    mostrame.style.display = 'flex'
}

const cerrarModal = e =>{
    e.parentElement.style.display = 'none'
}

const setCarrito = objeto => {

    let producto = {
        id: objeto.querySelector('a').id,
        nombre: objeto.querySelector('h3').textContent,
        precio: parseInt(objeto.querySelector('.product-price').textContent.replace('$', '')),
        img: objeto.querySelector('.product-image').querySelector('figure').querySelector('img').src,
        cantidad: 1
    }

    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = { ...producto }


    mostrarCarrito()
}

const mostrarCarrito = () => {
    tabla.style.display = 'block'
    TotalNuevo.style.display = "block"
    if (Object.keys(carrito).length === 0) {
        tabla.style.display = 'none'
        TotalNuevo.style.display = "none"
    }
    productos.innerHTML = ''
    Object.values(carrito).forEach(producto => {

        templateCarrito.querySelector('.product-name').textContent = producto.nombre
        templateCarrito.querySelector('.product-image').querySelector('img').src = producto.img
        templateCarrito.querySelector('.product-price').textContent = '$' + producto.precio
        templateCarrito.querySelector('.product-quantity').textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('.fa-window-close').dataset.id = producto.id
        templateCarrito.querySelector('.product-total').textContent = '$'+ producto.cantidad * producto.precio

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    productos.appendChild(fragment)


    pintarFooter()
}

const pintarFooter = () => {

    let nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    let nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)
    TotalNuevo.querySelector('#quantity').textContent = nCantidad
    TotalNuevo.querySelector('#price').textContent = '$'+nPrecio
  


    const btnEliminar = document.getElementById('delete')
    btnEliminar.addEventListener('click', () => {
        carrito = {}
        checkout.style.display = "none"
        TotalNuevo.style.display = "none"
        mostrarCarrito()
    })
    const next = document.getElementById('siguiente')
    next.addEventListener('click',() =>{
        let listaProducto = []
        checkout.style.display = "block"
        Object.values(carrito).forEach(producto => {
        listaProducto.push(`(${producto.cantidad})${producto.nombre}`)
        })

   
        detalles.innerHTML = `
        <input type="hidden" name="productos" value="${listaProducto}">
        <input type="hidden" name="precio" value="${nPrecio}">
        `
        })
        


}


const btnAccion = e => {
    if (e.target.classList.contains('fa-window-close')) {
        // const producto = carrito[e.target.dataset.id]
        const producto = carrito[e.target.dataset.id]
        console.log(e.target.dataset.id)
        delete carrito[e.target.dataset.id]

        mostrarCarrito()
    }
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        mostrarCarrito()
    }
    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        mostrarCarrito()
    }
}


