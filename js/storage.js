// Obtener el carrito del localStorage
export function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Guardar el carrito en localStorage
export function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Actualizar la burbuja del carrito
export function updateCartBubble() {
  const cart = getCart();
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartCountElements = document.querySelectorAll('.cart-bubble');

  // Actualizar el contenido en cada elemento encontrado
  cartCountElements.forEach((element) => {
    if (totalQuantity > 0) {
      element.textContent = totalQuantity;
      element.style.display = "inline-block"; // Muestra la burbuja
    } else {
      element.style.display = "none"; // Oculta la burbuja si el carrito está vacío
    }
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
