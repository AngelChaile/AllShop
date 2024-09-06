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

if (product) {
  const { id, nombre, precio, descripcion, img, stock } = product;

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
      
            <h4 id="product-stock">
              <span class="stock-label">Stock:</span>
              <span class="stock-value">${stock}</span>
            </h4>

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


// Carrito //

const btnComprar = document.getElementById("comprar");

btnComprar.addEventListener("click", addToCart);

// Función para agregar un producto al carrito
function addToCart() {
  // Obtener el carrito del localStorage, o inicializarlo como un array vacío si no existe
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Buscar si el producto ya existe en el carrito
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
      existingItem.quantity += 1; // Si el producto ya está en el carrito, incrementar la cantidad
  } else {
      cart.push({ ...product, quantity: 1 }); // Si no está, agregarlo con cantidad 1
  }

  // Guardar el carrito actualizado en localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  Swal.fire({
    title: "Producto agregado al carrito",
    icon: "success"
  });

}

