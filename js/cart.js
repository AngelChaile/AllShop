// cart.js

import { getCart, saveCart, updateCartBubble } from "./storage.js";
import { showAlert } from "./alerts.js";

let couponApplied = false; // Controla si el cupón ya fue aplicado

// Función para aplicar el cupón de descuento
function applyCoupon() {
  const couponInput = document.querySelector("#coupon input");
  const totalElement = document.querySelector("#subtotal table tr:nth-child(3) td:nth-child(2)");

  if (!couponInput || !totalElement) return;

  const couponCode = couponInput.value.trim().toUpperCase();

  if (couponCode === "FAMILIA" && !couponApplied) {
    couponApplied = true; // Marcar el cupón como aplicado
    const cart = getCart();
    const subtotal = cart.reduce((sum, product) => sum + product.precioOferta * product.quantity, 0);
    const discount = subtotal * 0.10;
    const totalWithDiscount = subtotal - discount;

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
  const subtotalElement = document.querySelector("#subtotal table tr:nth-child(1) td:nth-child(2)");
  const totalElement = document.querySelector("#subtotal table tr:nth-child(3) td:nth-child(2)");

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
  totalElement.textContent = `$${subtotal.toFixed(2)}`;

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

  if (newQuantity < 1) {
    newQuantity = 1;
    showAlert("La cantidad mínima es 1");
  } else if (newQuantity > product.stock) {
    newQuantity = product.stock;
    showAlert("Stock insuficiente");
  }

  product.quantity = Number(newQuantity); // Asegurarse de que sea un número
  saveCart(cart);
  updateCartUI();
  updateCartBubble();
}

// Función para eliminar un producto del carrito
export function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1); // Eliminar el producto del array
  saveCart(cart); // Guardar el carrito actualizado
  updateCartBubble(); // Actualizar burbuja del carrito
  updateCartUI(); // Refrescar UI del carrito
}

// Evento para cargar la interfaz del carrito al abrir la página
document.addEventListener("DOMContentLoaded", () => {
  updateCartBubble();
  updateCartUI();

  const applyCouponButton = document.querySelector("#coupon button");
  if (applyCouponButton) {
    applyCouponButton.addEventListener("click", (event) => {
      event.preventDefault();
      applyCoupon();
    });
  }
});
