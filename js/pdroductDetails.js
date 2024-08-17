// Mostrar detalles del producto en sproduct.html
const productDetailsContainer = document.getElementById("prodetails");

// Obtener el origen del producto
const origenProducto = localStorage.getItem("origenProducto");

let product;

// Verificar de dónde proviene el producto
if (origenProducto === "index") {
  product = JSON.parse(localStorage.getItem("productStar"));
} else if (origenProducto === "shop") {
  product = JSON.parse(localStorage.getItem("selectedProduct"));
}


carrito = [];

if (product) {
  const { id, nombre, precio, descripcion, img } = product;

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
            <h2 id="product-price">$ ${precio}</h2>
            <select>
              <option>Seleccione el tamaño</option>
              <option>Pequeño</option>
              <option>Mediano</option>
              <option>Grande</option>
              <option>XL</option>
            </select>
            <input id="cantidad" type="number" value="1">
            <button id="comprar" class="normal">Agregar al Carrito</button>
            <h4>Detalles del Producto</h4>
            <pre><span id="product-description">${descripcion}</span></pre>
          </div>
        `;
} else {
  productDetailsContainer.innerHTML = `<p>No se ha seleccionado ningún producto.</p>`;
}

const mainImg = document.getElementById("MainImg");
const smallImgs = document.querySelectorAll(".small-img");

smallImgs.forEach((img) => {
  img.addEventListener("click", () => {
    mainImg.src = img.src;
  });
});

const botonComprar = document.getElementById("comprar");

botonComprar.addEventListener("click", () => {
  const cantidad = document.getElementById("cantidad");
  carrito.push({
    id: product.id,
    img: product.img[0],
    nombre: product.nombre,
    precio: product.precio,
    cantidad: cantidad.value,
  });
  console.log(carrito);
  console.log("carrito agregado")
});
