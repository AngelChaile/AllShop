// js/cart.js - VERSIÓN COMPLETA CORREGIDA
import { getCart, saveCart, updateCartBubble } from "./storage.js";
import { showAlert } from "./alerts.js";
import { stockManager } from "./stock-manager.js";

let couponApplied = false;
let totalWithDiscount = 0;

// Función para aplicar el cupón de descuento
function applyCoupon() {
  const couponInput = document.querySelector("#coupon input");
  const totalElement = document.querySelector(
    "#subtotal table tr:nth-child(3) td:nth-child(2)"
  );

  if (!couponInput || !totalElement) return;

  const couponCode = couponInput.value.trim().toUpperCase();

  if (couponCode === "FAMILIA" && !couponApplied) {
    couponApplied = true;
    const cart = getCart();
    const subtotal = cart.reduce(
      (sum, product) => sum + product.precioOferta * product.quantity,
      0
    );
    const discount = subtotal * 0.1;
    totalWithDiscount = subtotal - discount;

    totalElement.textContent = `$${totalWithDiscount.toFixed(2)}`;
    showAlert("Se ha aplicado un cupón de descuento", "success");
  } else if (couponApplied) {
    showAlert("El cupón ya ha sido utilizado", "info");
  } else {
    showAlert("Cupón inválido", "error");
  }
}

// Función para actualizar la UI del carrito
export function updateCartUI() {
  const cartTableBody = document.querySelector("#cart tbody");
  const subtotalElement = document.querySelector(
    "#subtotal table tr:nth-child(1) td:nth-child(2)"
  );
  const totalElement = document.querySelector(
    "#subtotal table tr:nth-child(3) td:nth-child(2)"
  );

  if (!cartTableBody || !subtotalElement || !totalElement) return;

  const cart = getCart();
  cartTableBody.innerHTML = "";

  let subtotal = 0;

  cart.forEach((product, index) => {
    const { img, nombre, precioOferta, quantity, stock } = product;
    const productSubtotal = precioOferta * quantity;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${img[0]}" alt="${nombre}"></td>
      <td>${nombre}</td>
      <td>$${precioOferta}</td>
      <td><input type="number" value="${quantity}" min="1" max="${stock}" data-index="${index}" class="quantity-input"></td>
      <td>$${productSubtotal.toFixed(2)}</td>
      <td><button class="remove-btn" data-index="${index}"><i class="fa-regular fa-trash-can"></i></button></td>
    `;
    cartTableBody.appendChild(row);

    subtotal += productSubtotal;
  });

  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  totalElement.textContent = `$${
    couponApplied ? (subtotal * 0.9).toFixed(2) : subtotal.toFixed(2)
  }`;

  // Añadir eventos a los botones de eliminar producto
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const index = button.getAttribute("data-index");
      removeFromCart(index);
    });
  });

  // Añadir eventos a los inputs de cantidad
  const quantityInputs = document.querySelectorAll(".quantity-input");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", () => {
      const index = input.getAttribute("data-index");
      updateQuantity(index, input.value);
    });
  });
}

// Función para actualizar la cantidad de un producto en el carrito
export function updateQuantity(index, newQuantity) {
  const cart = getCart();
  const product = cart[index];
  const oldQuantity = product.quantity || 1;

  if (newQuantity < 1) {
    newQuantity = 1;
    showAlert("La cantidad mínima es 1");
  }

  // Verificar stock disponible considerando reservas
  const stockDisponible = stockManager.getAvailableStock(product.id, product.stock);
  if (parseInt(newQuantity) > stockDisponible) {
    newQuantity = stockDisponible;
    showAlert(`Solo quedan ${stockDisponible} unidades disponibles`);
  }

  // Ajustar reservas
  const diferencia = parseInt(newQuantity) - oldQuantity;
  if (diferencia > 0) {
    stockManager.reserveStock(product.id, diferencia);
  } else if (diferencia < 0) {
    stockManager.releaseStock(product.id, Math.abs(diferencia));
  }

  product.quantity = Number(newQuantity);
  saveCart(cart);
  updateCartUI();
  updateCartBubble();
}

// Función para eliminar un producto del carrito
export function removeFromCart(index) {
  const cart = getCart();
  const productoEliminado = cart[index];
  
  if (productoEliminado) {
    // Liberar el stock reservado
    stockManager.releaseStock(productoEliminado.id, productoEliminado.quantity);
  }
  
  cart.splice(index, 1);
  saveCart(cart);
  updateCartBubble();
  updateCartUI();
}

// Función para vaciar el carrito
function clearCart() {
  const cart = getCart();
  
  // Liberar todas las reservas
  cart.forEach(product => {
    stockManager.clearReservation(product.id);
  });
  
  saveCart([]);
  updateCartBubble();
  updateCartUI();
  couponApplied = false; // Resetear cupón
}

// Función para agregar un producto al carrito (CORREGIDA)
export function addToCart(product) {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === product.id);
  const nuevaCantidad = existingItem ? existingItem.quantity + 1 : 1;

  // Verificar stock disponible (considerando reservas)
  const stockDisponible = stockManager.getAvailableStock(product.id, product.stock);
  
  if (nuevaCantidad > stockDisponible) {
    showAlert(`Solo quedan ${stockDisponible} unidades disponibles`, "error");
    return false;
  }

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ 
      ...product, 
      quantity: 1 
    });
  }

  // Reservar stock
  stockManager.reserveStock(product.id, 1);
  
  saveCart(cart);
  showAlert("Producto agregado al carrito", "success");
  updateCartBubble();
  return true;
}

// Función para enviar el pedido a WhatsApp (método antiguo)
function enviarPedidoWhatsApp(cart) {
  if (cart.length === 0) {
    showAlert("El carrito está vacío", "error");
    return;
  }

  let mensaje = "Hola, quiero realizar el siguiente pedido:\n";
  let subtotal = cart.reduce(
    (sum, product) => sum + product.precioOferta * product.quantity,
    0
  );
  let total = couponApplied ? subtotal * 0.9 : subtotal;

  cart.forEach((producto, index) => {
    mensaje += `${index + 1}. ${producto.nombre} - Cantidad: ${
      producto.quantity
    } - Precio: $${producto.precioOferta}\n`;
  });

  if (couponApplied) {
    mensaje += "\n*Se aplicó un cupón de descuento del 10%.*";
  }

  mensaje += `\nTotal: $${total.toFixed(2)}`;

  const mensajeCodificado = encodeURIComponent(mensaje);
  const numeroWhatsApp = "541161158649";
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

  window.open(urlWhatsApp, "_blank");

  // Limpiar carrito y reservas después de enviar
  clearCart();
}

// Nueva función para procesar checkout (con MercadoPago y WhatsApp)
async function procesarCheckout() {
  const cart = getCart();
  if (cart.length === 0) {
    showAlert("El carrito está vacío", "error");
    return;
  }

  // Verificar stock antes de proceder
  for (const item of cart) {
    const availableStock = stockManager.getAvailableStock(item.id, item.stock);
    if (item.quantity > availableStock) {
      showAlert(`Stock insuficiente para ${item.nombre}. Solo quedan ${availableStock} unidades.`, "error");
      return;
    }
  }

  // Preguntar método de pago
  const { value: paymentMethod } = await Swal.fire({
    title: 'Método de pago',
    text: '¿Cómo quieres proceder con tu compra?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: '💳 Pagar con MercadoPago',
    cancelButtonText: '📱 Enviar por WhatsApp',
    showDenyButton: true,
    denyButtonText: 'Continuar comprando'
  });

  if (paymentMethod === 'deny') return;

  if (paymentMethod) {
    // MercadoPago - para implementar después
    showAlert("MercadoPago estará disponible pronto", "info");
    // await procesarConMercadoPago(cart);
  } else {
    // WhatsApp (método actual)
    enviarPedidoWhatsApp(cart);
  }
}

// Evento para cargar la interfaz del carrito al abrir la página
document.addEventListener("DOMContentLoaded", () => {
  // Limpiar reservas expiradas
  stockManager.cleanupExpiredReservations();
  
  updateCartBubble();
  updateCartUI();

  const applyCouponButton = document.querySelector("#coupon button");
  if (applyCouponButton) {
    applyCouponButton.addEventListener("click", (event) => {
      event.preventDefault();
      applyCoupon();
    });
  }

  const finalizarCompraButton = document.querySelector("#btnFinalizarCompra");
  if (finalizarCompraButton) {
    finalizarCompraButton.addEventListener("click", procesarCheckout);
  }
});