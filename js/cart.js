// Función para obtener el stock disponible de un producto desde el array de productos
function getProductStock(productId) {
  const products = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find((p) => p.id === productId);
  return product ? product.stock : 0;
}

// Función para actualizar la cantidad de un producto en el carrito
function updateQuantity(index, newQuantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
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
    document.querySelector(
      `#cart tbody tr:nth-child(${index + 1}) input`
    ).value = cart[index].quantity;
  } else {
    cart[index].quantity = parseInt(newQuantity); // Actualizar la cantidad si es válida
    localStorage.setItem("cart", JSON.stringify(cart)); // Guardar los cambios en el localStorage
    updateCartUI(); // Actualizar la interfaz del carrito
  }
}

// Variables globales
let couponApplied = false;
let discount = 0;

// Función para aplicar el cupón
function applyCoupon() {
  const couponInput = document.querySelector("#coupon input").value.trim();

  if (couponInput === "FAMILIA") {
    discount = 0.1; // Descuento del 10%
    couponApplied = true;
    Swal.fire({
      title: "Cupón aplicado",
      text: "Se ha aplicado un descuento",
      icon: "success",
    });
  } else {
    Swal.fire({
      title: "Cupón inválido",
      text: "El cupón ingresado no es válido",
      icon: "error",
    });
  }

  // Actualizar la interfaz del carrito con el descuento aplicado
  updateCartUI();
}

// Modificar la función updateCartUI para aplicar el descuento solo en el total
function updateCartUI() {
  // Obtener el carrito del localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Seleccionar el cuerpo de la tabla del carrito
  const cartTableBody = document.querySelector("#cart tbody");
  const subtotalElement = document.querySelector(
    "#subtotal table tr:nth-child(1) td:nth-child(2)"
  );
  const totalElement = document.querySelector(
    "#subtotal table tr:nth-child(3) td:nth-child(2)"
  );

  // Limpiar el contenido actual de la tabla
  cartTableBody.innerHTML = "";

  let subtotal = 0;

  // Recorrer cada producto en el carrito
  cart.forEach((product, index) => {
    const { id, img, nombre, precio, quantity } = product;
    const productSubtotal = precio * quantity;

    // Crear una nueva fila para el producto
    const row = document.createElement("tr");

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

  // Mostrar el subtotal sin descuentos
  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;

  // Aplicar el descuento en el total si el cupón fue aplicado
  let total = subtotal;
  if (couponApplied) {
    total = subtotal - subtotal * discount; // Aplicar descuento solo al total
  }

  // Actualizar el total con o sin descuento
  totalElement.textContent = `$${total.toFixed(2)}`;
}

// Evento para aplicar el cupón al hacer clic en el botón
const applyCouponButton = document.querySelector("#coupon button");
applyCouponButton.addEventListener("click", applyCoupon);

// Llamar a la función para actualizar el carrito al cargar la página
updateCartUI();

// Función para eliminar un producto del carrito
function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // Eliminar el producto del carrito
  localStorage.setItem("cart", JSON.stringify(cart)); // Guardar los cambios
  updateCartUI(); // Actualizar la interfaz del carrito
}

// Llamar a la función para actualizar el carrito al cargar la página
updateCartUI();
