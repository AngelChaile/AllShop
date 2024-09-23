// Función para obtener el stock disponible de un producto desde el array de productos
function getProductStock(productId) {
  const products = JSON.parse(localStorage.getItem('cart')) || [];
  const product = products.find(p => p.id === productId);
  return product ? product.stock : 0;
}

// Función para actualizar la cantidad de un producto en el carrito
function updateQuantity(index, newQuantity) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productId = cart[index].id;
  console.log(productId);
  const stockAvailable = getProductStock(productId); // Obtener el stock del producto
  console.log(stockAvailable);

  if (newQuantity > stockAvailable) {
    Swal.fire({
      title: "Stock Insuficiente",
      icon: "error",
    });
    // Revertir la cantidad a la original en el carrito
    document.querySelector(`#cart tbody tr:nth-child(${index + 1}) input`).value = cart[index].quantity;
  } else {
    cart[index].quantity = parseInt(newQuantity); // Actualizar la cantidad si es válida
    localStorage.setItem('cart', JSON.stringify(cart)); // Guardar los cambios en el localStorage
    updateCartUI(); // Actualizar la interfaz del carrito
  }
}

// Función para actualizar la interfaz del carrito
function updateCartUI() {
  // Obtener el carrito del localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Seleccionar el cuerpo de la tabla del carrito
  const cartTableBody = document.querySelector('#cart tbody');
  const subtotalElement = document.querySelector('#subtotal table tr:nth-child(1) td:nth-child(2)');
  const totalElement = document.querySelector('#subtotal table tr:nth-child(3) td:nth-child(2)');

  // Limpiar el contenido actual de la tabla
  cartTableBody.innerHTML = '';

  let subtotal = 0;

  // Recorrer cada producto en el carrito
  cart.forEach((product, index) => {
    const {id, img, nombre, precio, quantity } = product;
    const productSubtotal = precio * quantity;

    // Crear una nueva fila para el producto
    const row = document.createElement('tr');

    row.innerHTML = `
      <td><a href="#" onclick="removeFromCart(${index})"><i class="fa-regular fa-circle-xmark"></i></a></td>
      <td><img src="${img[0]}" alt="${nombre}"></td>
      <td>${nombre}</td>
      <td>$${precio.toFixed(2)}</td>
      <td><input type="number" value="${quantity}" min="1" onchange="updateQuantity(${index}, this.value)"></td>
      <td>$${productSubtotal.toFixed(2)}</td>
    `;

    // Añadir la fila a la tabla
    cartTableBody.appendChild(row);

    subtotal += productSubtotal;
  });

  // Actualizar el subtotal y el total
  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  totalElement.textContent = `$${subtotal.toFixed(2)}`; // Asumiendo que el envío es gratis
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1); // Eliminar el producto del carrito
  localStorage.setItem('cart', JSON.stringify(cart)); // Guardar los cambios
  updateCartUI(); // Actualizar la interfaz del carrito
}

// Llamar a la función para actualizar el carrito al cargar la página
updateCartUI();
