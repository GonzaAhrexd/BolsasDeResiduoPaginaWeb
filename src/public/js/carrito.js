
let carro = document.getElementById("Productos")
let objetosCarrito = []
const tabla = document.getElementById("tablaCarro")
const templateTotal = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
let carrito = {}
const items = document.querySelectorAll('#items')
const productos = document.getElementById('Productos')
const total = document.getElementById('Total')
const fragment = document.createDocumentFragment()
items.forEach(item => {
    item.addEventListener('click', e => {
        addCarrito(e)
    })
})
productos.addEventListener('click',e =>{
    btnAccion(e)
})

const addCarrito = e => {

    if (e.target.classList.contains('cart-btn')) {


        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
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
    if(Object.keys(carrito).length === 0){
        tabla.style.display = 'none'
    }
    productos.innerHTML = ''
    Object.values(carrito).forEach(producto => {
       
        templateCarrito.querySelector('.product-name').textContent = producto.nombre
        templateCarrito.querySelector('.product-image').querySelector('img').src = producto.img
        templateCarrito.querySelector('.product-price').textContent = '$'+producto.precio
        templateCarrito.querySelector('.product-quantity').textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('.fa-window-close').dataset.id = producto.id
        templateCarrito.querySelector('.product-total').textContent = producto.cantidad * producto.precio
        
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    productos.appendChild(fragment)


    pintarFooter()
}

const pintarFooter = () =>{
    total.innerHTML = ''
    if(Object.keys(carrito).length === 0){
        total.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `
        return
    }
     
    let nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad,0)
    let nPrecio = Object.values(carrito).reduce((acc, { cantidad,precio }) => acc + cantidad*precio,0)
    
    templateTotal.querySelectorAll('td')[0].textContent = nCantidad
    templateTotal.querySelector('span').textContent = nPrecio

    const clone = templateTotal.cloneNode(true)
    
    fragment.appendChild(clone)
    total.appendChild(fragment)

    const btnEliminar = document.getElementById('vaciar-carrito')
    btnEliminar.addEventListener('click', ()=>{
        carrito = {}
        mostrarCarrito()
    })
    }

const btnAccion = e =>{
   if(e.target.classList.contains('fa-window-close')){
        // const producto = carrito[e.target.dataset.id]
        const producto = carrito[e.target.dataset.id]
        console.log(e.target.dataset.id)
        delete carrito[e.target.dataset.id]
        
        mostrarCarrito()
    }
    if(e.target.classList.contains('btn-info')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        mostrarCarrito()
    }
    if(e.target.classList.contains('btn-danger')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0){
            delete carrito[e.target.dataset.id]
        }
        mostrarCarrito()
    }
} 
