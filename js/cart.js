const verCarrito = document.querySelector(".verCarrito");

verCarrito.addEventListener("click", () => {
  console.log("funciona perro")
})


// cart.js

// Obtener los elementos del DOM
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Cargar carrito desde localStorage (si existe)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para actualizar la interfaz del carrito
function updateCartUI() {
    cartItemsContainer.innerHTML = ''; // Limpiar el contenedor de elementos del carrito
    let total = 0;

    cart.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <span>${item.name} - ${item.quantity} x $${item.price}</span>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = total.toFixed(2);

    console.log("funcionando");
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1); // Eliminar el producto del array
    localStorage.setItem('cart', JSON.stringify(carrito)); // Actualizar el localStorage
    updateCartUI(); // Actualizar la interfaz
}

// Actualizar el carrito cuando se carga la página
updateCartUI();
