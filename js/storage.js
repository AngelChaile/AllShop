// Obtener el carrito del localStorage
export function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Guardar el carrito en localStorage
export function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Actualizar la burbuja del carrito en todas las vistas
export function updateCartBubble() {
  const cart = getCart();
  
  // Seleccionar todos los elementos con la clase 'cart-count'
  const cartCountElements = document.querySelectorAll('.cart-count');
  
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  
  // Actualizar el contenido en cada elemento encontrado
  cartCountElements.forEach(element => {
    element.textContent = totalQuantity;
  });
}


// Guardar el stock actualizado del producto
export function saveProductStock(productId, stock) {
  let products = JSON.parse(localStorage.getItem('products')) || [];
  let product = products.find(p => p.id === productId);
  if (product) {
      product.stock = stock;
      localStorage.setItem('products', JSON.stringify(products));
  }
}
