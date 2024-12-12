import { addToCart } from "./cart.js";

// Mostrar detalles del producto en productDetails.html
const productDetailsContainer = document.getElementById("prodetails");

// Obtener el origen del producto desde el localStorage
const product = JSON.parse(localStorage.getItem("selectedProduct"));

if (product) {
  const { id, nombre, precio, precioOferta, descripcion, img, stock } = product;

  // Crear los divs de las imágenes pequeñas dinámicamente
  const smallImgDivs = img
    .map((image, index) => {
      return `
            <div class="small-img-col">
              <img src="${image}" width="100%" class="small-img" alt="${nombre} ${index}" />
            </div>
          `;
    })
    .join("");

  productDetailsContainer.innerHTML = `
          <div class="single-pro-image">
            <img src="${img[0]}" width="100%" id="MainImg" alt="${nombre}" />
            <div class="small-img-group">
              ${smallImgDivs}
            </div>
          </div>
          <div class="single-pro-details">
            <h6>Inicio / Producto</h6>
            <h4 id="product-title">${nombre}</h4>
            <div class="price-container">
              <span class="original-price">$${precio}</span>
              <span class="offer-price">$${precioOferta}</span>
            </div>
            <h4 id="product-stock">
              <span class="stock-label">Stock:</span>
              <span class="stock-value" id="stockValue">${stock}</span>
            </h4>
            <button id="comprar" class="normal">Agregar al Carrito</button>
            <h4>Detalles del Producto</h4>
            <pre><span id="product-description">${descripcion}</span></pre>
          </div>
        `;

  // Cambiar la imagen principal al hacer clic en las imágenes pequeñas
  const mainImg = document.getElementById("MainImg");
  const smallImgs = document.querySelectorAll(".small-img");

  smallImgs.forEach((img) => {
    img.addEventListener("click", () => {
      mainImg.src = img.src;
    });
  });

 
  const btnComprar = document.getElementById("comprar");

  btnComprar.addEventListener("click", () => {
    // Función para agregar un producto al carrito
    addToCart(product);
  });
} else {
  productDetailsContainer.innerHTML = `<p>No se ha seleccionado ningún producto.</p>`;
}
