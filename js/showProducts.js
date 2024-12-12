const proContainer = document.getElementById("pro-container");

const productsPerPage = 8; // Número de productos por página
let currentPage = 1; // Página actual

// Función para mostrar productos con paginación
let mostrarProductos = (page = 1) => {
  // Limpiar productos actuales
  proContainer.innerHTML = "";

  // Calcular el índice inicial y final para los productos de la página actual
  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;

  // Obtener los productos para la página actual
  const paginatedProducts = products.slice(start, end);

  // Agregar productos al contenedor
  paginatedProducts.forEach((product) => {
    let pro = document.createElement("div");
    pro.className = "pro";

    pro.innerHTML = `
  <img src="${product.img[0]}" alt="${product.nombre}">
  <div class="des">
      <span>${product.detalle}</span>
      <h5>${product.nombre}</h5>
      <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
      </div>
      <div class="price-container">
          <span class="original-price">$${product.precio}</span>
         
          <span class="offer-price">$${product.precioOferta}</span>
      </div>
  </div>
      <a href="#">
        <i class="fa-solid fa-cart-shopping cart"></i>
      </a>
`;

    pro.addEventListener("click", () => {
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      localStorage.setItem("origenProducto", "shop");
      window.location.href = "productDetails.html";
    });

    proContainer.append(pro);
  });

  // Actualizar la paginación
  mostrarPaginacion(page);
};

// Función para mostrar la paginación
let mostrarPaginacion = (page) => {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(products.length / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = i;
    if (i === page) pageLink.classList.add("active");
    pageLink.addEventListener("click", () => {
      mostrarProductos(i);
    });
    pagination.appendChild(pageLink);
  }
};

// Inicializar productos en la página actual
mostrarProductos(currentPage);
