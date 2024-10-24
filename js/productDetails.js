// productDetails.js
import { addToCart } from './cart.js';
import { showAlert } from './alerts.js';

// Cambiar la imagen principal cuando se haga clic en una imagen pequeña
const smallImgs = document.querySelectorAll('.small-img');
const mainImg = document.querySelector('#main-img');

smallImgs.forEach(img => img.addEventListener('click', (event) => {
  mainImg.src = event.target.src;
}));

// Supongamos que tienes un botón para agregar al carrito
const addToCartButton = document.querySelector('#add-to-cart');

addToCartButton.addEventListener('click', () => {
  const product = {
    id: 1, // Supongamos que este es el ID del producto actual
    name: 'Producto de ejemplo',
    price: 100,
    stock: 5, // El stock actual del producto
  };
  
  addToCart(product);
});
