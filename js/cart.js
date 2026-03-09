// js/cart.js - VERSIÓN COMPLETA CON MERCADO PAGO
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

// ========== FUNCIÓN NUEVA: Procesar con MercadoPago ==========
async function procesarConMercadoPago(cart) {
  try {
    // 1. Pedir datos del cliente
    const { value: customerData } = await Swal.fire({
      title: 'Información para el envío',
      html: `
        <div style="text-align: left; margin-bottom: 15px; color: #666;">
          Completa tus datos para procesar el pedido
        </div>
        <input id="customer-name" class="swal2-input" placeholder="Nombre completo *" required>
        <input id="customer-email" class="swal2-input" placeholder="Email *" type="email" required>
        <input id="customer-phone" class="swal2-input" placeholder="Teléfono *" type="tel" required>
        <input id="customer-address" class="swal2-input" placeholder="Dirección completa *" required>
        <textarea id="customer-notes" class="swal2-textarea" placeholder="Notas adicionales (opcional)" style="height: 80px;"></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Continuar al pago',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const name = document.getElementById('customer-name').value.trim();
        const email = document.getElementById('customer-email').value.trim();
        const phone = document.getElementById('customer-phone').value.trim();
        const address = document.getElementById('customer-address').value.trim();
        const notes = document.getElementById('customer-notes').value.trim();

        // Validaciones básicas
        if (!name) {
          Swal.showValidationMessage('El nombre es obligatorio');
          return false;
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          Swal.showValidationMessage('Ingresa un email válido');
          return false;
        }
        if (!phone || phone.length < 8) {
          Swal.showValidationMessage('Ingresa un teléfono válido');
          return false;
        }
        if (!address) {
          Swal.showValidationMessage('La dirección es obligatoria');
          return false;
        }

        return {
          name: name,
          email: email,
          phone: phone,
          address: address,
          notes: notes
        };
      }
    });

    if (!customerData) return;

    // 2. Mostrar resumen del pedido
    let resumenHTML = '<div style="text-align: left; max-height: 300px; overflow-y: auto;">';
    let total = 0;
    
    cart.forEach((producto, index) => {
      const subtotal = producto.precioOferta * producto.quantity;
      total += subtotal;
      resumenHTML += `
        <div style="margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #eee;">
          <strong>${producto.nombre}</strong><br>
          Cantidad: ${producto.quantity} × $${producto.precioOferta} = $${subtotal.toFixed(2)}
        </div>
      `;
    });

    if (couponApplied) {
      total = total * 0.9;
      resumenHTML += `<div style="color: #4CAF50; margin: 10px 0;">Cupón aplicado: 10% de descuento</div>`;
    }

    resumenHTML += `<div style="margin-top: 15px; font-size: 1.2em; font-weight: bold; color: #088178;">Total: $${total.toFixed(2)}</div>`;
    resumenHTML += '</div>';

    // 3. Confirmar pedido
    const { value: confirmar } = await Swal.fire({
      title: 'Resumen del pedido',
      html: resumenHTML,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Pagar con MercadoPago',
      cancelButtonText: 'Revisar datos',
      confirmButtonColor: '#009ee3'
    });

    if (!confirmar) {
      // Volver a pedir datos
      await procesarConMercadoPago(cart);
      return;
    }

    // 4. Mostrar loading
    Swal.fire({
      title: 'Procesando tu pago...',
      text: 'Estamos preparando todo para que completes tu compra',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // 5. Importar servicio MercadoPago dinámicamente (para no cargarlo si no se usa)
    const { mercadoPagoService } = await import('./mercado-pago-frontend.js');
    
    // 6. Redirigir a checkout
    await mercadoPagoService.redirectToCheckout(cart, customerData);
    
  } catch (error) {
    console.error('Error en MercadoPago:', error);
    
    Swal.fire({
      title: 'Error',
      html: `
        <div style="color: #d32f2f; margin-bottom: 15px;">
          <strong>No se pudo procesar el pago</strong>
        </div>
        <div style="text-align: left; background: #fff8f8; padding: 10px; border-radius: 5px; margin: 10px 0;">
          ${error.message || 'Ocurrió un error inesperado'}
        </div>
        <div style="margin-top: 20px; color: #666; font-size: 0.9em;">
          Puedes intentar nuevamente o usar el método de WhatsApp.
        </div>
      `,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Reintentar',
      cancelButtonText: 'Usar WhatsApp'
    }).then((result) => {
      if (result.isConfirmed) {
        procesarConMercadoPago(cart);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        enviarPedidoWhatsApp(cart);
      }
    });
  }
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
    title: '¿Cómo querés pagar?',
    html: `
      <div style="text-align: left; margin: 15px 0; color: #666;">
        <div style="margin-bottom: 10px;">
          <strong>💳 MercadoPago:</strong> Pago seguro con tarjeta, efectivo o transferencia
        </div>
        <div>
          <strong>📱 WhatsApp:</strong> Envía tu pedido y coordina el pago
        </div>
      </div>
    `,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: '💳 MercadoPago',
    cancelButtonText: '📱 WhatsApp',
    showDenyButton: true,
    denyButtonText: 'Seguir comprando',
    confirmButtonColor: '#009ee3',
    cancelButtonColor: '#25D366',
    denyButtonColor: '#088178'
  });

  if (paymentMethod === 'deny') return;

  if (paymentMethod) {
    // MercadoPago
    await procesarConMercadoPago(cart);
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

// Exportar funciones necesarias para otros archivos
export { 
  clearCart,
  getCart,
  couponApplied,
  totalWithDiscount
};