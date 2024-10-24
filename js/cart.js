// cart.js
import { getCart, saveCart, updateCartBubble } from './storage.js';
import { showAlert } from './alerts.js';

export function addToCart(product) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);

  if (product.stock > 0) {
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    product.stock--;
    saveCart(cart);
    updateCartBubble();
    saveProductStock(product.id, product.stock);
  } else {
    showAlert("Producto Agotado", "error");
  }
}

// Llamar a la función para actualizar la burbuja cada vez que se cargue la página del carrito
document.addEventListener('DOMContentLoaded', updateCartBubble);
