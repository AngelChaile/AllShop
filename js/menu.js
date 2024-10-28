import { updateCartBubble } from './storage.js';
import { showAlert } from './alerts.js';

const btnRegistrarse = document.querySelector("#btn-registrar");

// BOTONES PARA ABRIR Y CERRAR MENU EN PANTALLAS PEQUEÑAS
const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

// Actualizar la burbuja del carrito al cargar la página
document.addEventListener('DOMContentLoaded', updateCartBubble);

btnRegistrarse.addEventListener("click", () => showAlert("Lo sentimos, aún no está disponible", "info"));

