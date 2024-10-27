// cart.js

import { getCart, saveCart, updateCartBubble } from "./storage.js"; // Importar desde storage.js
import { showAlert } from "./alerts.js";

// Función para agregar un producto al carrito
export function addToCart(product) {
  const cart = getCart();
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  updateCartBubble(); // Actualizar la burbuja
  showAlert("Producto agregado al carrito");
}

// Actualizar la UI del carrito
export function updateCartUI() {
  const cartTableBody = document.querySelector("#cart tbody");
  const subtotalElement = document.querySelector(
    "#subtotal table tr:nth-child(1) td:nth-child(2)"
  );
  const totalElement = document.querySelector(
    "#subtotal table tr:nth-child(3) td:nth-child(2)"
  );

  if (!cartTableBody || !subtotalElement || !totalElement) {
    return;
  }

  const cart = getCart();
  cartTableBody.innerHTML = "";

  let subtotal = 0;

  cart.forEach((product, index) => {
    const { img, nombre, precioOferta, quantity, stock } = product;
    const productSubtotal = precioOferta * quantity;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><button class="remove-btn" data-index="${index}"><i class="fa-regular fa-circle-xmark"></i></button></td>
      <td><img src="${img[0]}" alt="${nombre}"></td>
      <td>${nombre}</td>
      <td>$${precioOferta}</td>
      <td><input type="number" value="${quantity}" min="1" max="${stock}" data-index="${index}" class="quantity-input"></td>
      <td>$${productSubtotal.toFixed(2)}</td>
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
  updateCartBubble(); // Actualizar la burbuja del carrito tras el cambio de cantidad
}

// Función para eliminar un producto del carrito
export function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  updateCartBubble();
  updateCartUI();
}

// Evento para cargar la interfaz del carrito al abrir la página
document.addEventListener("DOMContentLoaded", () => {
  updateCartBubble();
  updateCartUI();
});
