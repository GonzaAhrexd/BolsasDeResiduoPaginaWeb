// JS Hecho manualmente

const totalContainer = document.querySelector(
  '.total-compra');

  const totalCompra =  `
  <div class="col-12">
      <div class="shopping-cart-total">
          <p>Total</p>
          <p class="shoppingCartTotal">0$</p>
          <div class="toast" role="alert" aria-live="assertive" aria-atomic="true"
              data-delay="2000">
          </div>
          <button class="btn btn-success comprarButton" type="button" data-toggle="modal"
              data-target="#comprarModal">Comprar</button>
      </div>
  </div>`;

const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', addToCartClicked); //Por cada botón de "Añadir", asignarles un EventListener
});



const shoppingCartItemsContainer = document.querySelector(
  '.shoppingCartItemsContainer'
);

function addToCartClicked(event) { //Funcion que toma los valores del producto que decidimos añadir

totalContainer.innerHTML = totalCompra;
const comprarButton = document.querySelector('.comprarButton');
  comprarButton.addEventListener('click', comprarButtonClicked); //Boton "Comprar" que procesa el pago

  const button = event.target;
  const item = button.closest('.product-item'); 

  const itemTitle = item.querySelector('.item-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;
  const itemImage = item.querySelector('.item-image').src;
  const itemDetail = item.querySelector('.item-detail').textContent;

  addItemToShoppingCart(itemTitle, itemPrice, itemImage, itemDetail);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage, itemdetail) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    'shoppingCartItemTitle'
  );
  for (let i = 0; i < elementsTitle.length; i++) { //Añade o disminuye la cantidad de 1 producto
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.shoppingCartItemQuantity' //Se le asigna esta clase al titulo de cada fila creada en el div de Productos del Carrito
      );
      elementQuantity.value++;
     
      updateShoppingCartTotal();
      return;
    }
  };

  const shoppingCartRow = document.createElement(`div`); //Crea una fila para un nuevo producto que no haya sido ya clickeado
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-2">
            <div class="shopping-cart-item">
                <img src=${itemImage} class="shopping-cart-image cart-img">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle cart-title">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-4">
            <div class="shopping-cart-detail">
                <p class="item-detail">${itemdetail}</p>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price">
                <p class="item-price shoppingCartItemPrice cart-price">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;    //Creación de la fila HTML de producto
  shoppingCartRow.innerHTML = shoppingCartContent; //El HTML de arriba se guarda en esta variable para ser llamada mas facilmente
  addItem(shoppingCartRow);
  
}

function addItem(shoppingCartRow) {

shoppingCartItemsContainer.append(shoppingCartRow);  //Selecciona el div que contiene las filas de productos y añade shoppingCartRow
shoppingCartRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem); //Le añade un EventListener a los botones de borrar creados dentro de la fila

  shoppingCartRow
    .querySelector('.shoppingCartItemQuantity') //Cambia el valor del total ya que se añade un nuevo precio al carrito
    .addEventListener('change', quantityChanged);

  updateShoppingCartTotal();
  
}

function updateShoppingCartTotal() { //Función que comprueba cada vez que se añade o borra un producto, el precio total
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => { //Por cada producto:
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice' //Selecciona el precio del producto
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('$', '') //Reemplaza el valor alfanumérico para poder hacer la suma
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity' //Toma el valor en el input de "cantidad"
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value //Tomar el valor numérico del input de "cantidad"
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity; //Se calcula la cantidad * el precio
  });

  if (total == 0){ //Si no hay nada en el carrito, no se muestra el total
    totalContainer.innerHTML = '';
  }

  shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`; //Solamente mostrar 2 decimales y agregar nuevamente el valor alfanumérico
}

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = ' '; //Al apretar "Comprar" se vacía el carrito y comienza una nueva compra
  updateShoppingCartTotal();
  totalContainer.innerHTML = '';
}

function removeShoppingCartItem(event) { //Destruye un producto del carrito de compra
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) { //Si la cantidad de un producto es menor o igual a 0, pasa a 1
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}