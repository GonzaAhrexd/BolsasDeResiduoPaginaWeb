const agregar = document.querySelectorAll('#agregar')
let carro = document.getElementById("Productos")
let objetosCarrito = []
const tabla = document.getElementById("tablaCarro")


agregar.forEach(agregar2 => {
    agregar2.addEventListener('click', addC)

    function addC() {
        tabla.style.display = "block"
        let Nombre = agregar2.parentNode.childNodes[3].innerHTML
        let Precio = agregar2.parentNode.childNodes[5].innerHTML
        let Imagen = agregar2.parentNode.childNodes[1].childNodes[1].childNodes[1].src
        let cantidad = 1;

        //ToFix No parsea y devuelva NaN

        let Precio2 = parseInt(Precio.replace('$', ''))

        // console.log(Precio2)

        // let cantidad = 0
       
            objetosCarrito.push(`
    <tr class="table-body-row">
    <td class="product-remove"><a href="#"><i class="far fa-window-close"></i></a>
    </td>
    <td class="product-image"> <img width="30%" src=${Imagen}> </td>
    <td class="product-name">${Nombre}</td>
    <td class="product-price">${Precio}</td>
    <td class="product-quantity"><input type="number" id="prueba" placeholder="1" min="1" value="1" ></td>
    <td class="product-total"> ${cantidad} </td>
    </tr>
    `)
   
    
        carro.innerHTML += objetosCarrito[objetosCarrito.length - 1]

    }
})