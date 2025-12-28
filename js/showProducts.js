// showProducts.js - VERSIÓN MODIFICADA PARA SUPABASE
import { getProducts } from './supabase-client.js';

const proContainer = document.getElementById("pro-container");
const productsPerPage = 8;
let currentPage = 1;
let allProducts = []; // Variable global para almacenar todos los productos

// Función para cargar productos desde Supabase
async function cargarProductos() {
  try {
    allProducts = await getProducts();
    
    // Adaptar estructura de Supabase a tu formato actual
    allProducts = allProducts.map(product => ({
      id: product.id,
      nombre: product.nombre,
      detalle: product.detalle || '',
      descripcion: product.descripcion || '',
      precio: product.precio,
      precioOferta: product.precio_oferta,
      stock: product.stock || 0,
      // Asegurar que img sea un array
      img: Array.isArray(product.imagenes) && product.imagenes.length > 0 
        ? product.imagenes 
        : ['img/placeholder.jpg']
    }));
    
    console.log('Productos cargados:', allProducts.length);
    mostrarProductos(currentPage);
  } catch (error) {
    console.error('Error cargando productos:', error);
    // Mostrar mensaje de error amigable
    proContainer.innerHTML = `
      <div class="error-message">
        <p>⚠️ No se pudieron cargar los productos en este momento.</p>
        <p>Por favor, intenta recargar la página.</p>
      </div>
    `;
  }
}

// Función para mostrar productos con paginación
function mostrarProductos(page = 1) {
  if (allProducts.length === 0) {
    proContainer.innerHTML = '<p class="no-products">No hay productos disponibles</p>';
    return;
  }

  proContainer.innerHTML = "";

  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const paginatedProducts = allProducts.slice(start, end);

  paginatedProducts.forEach((product) => {
    const pro = document.createElement("div");
    pro.className = "pro";

    // Usar la primera imagen del array
    const primeraImagen = product.img[0] || 'img/placeholder.jpg';
    
    pro.innerHTML = `
      <img src="${primeraImagen}" alt="${product.nombre}" loading="lazy">
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
        ${product.stock === 0 ? '<span class="agotado">AGOTADO</span>' : ''}
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

    proContainer.appendChild(pro);
  });

  mostrarPaginacion(page);
}

// Función para mostrar la paginación
function mostrarPaginacion(page) {
  const pagination = document.getElementById("pagination");
  if (!pagination) return; // Si no hay elemento de paginación, salir
  
  pagination.innerHTML = "";
  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  // Solo mostrar paginación si hay más de una página
  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = i;
    if (i === page) pageLink.classList.add("active");
    pageLink.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      mostrarProductos(i);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    pagination.appendChild(pageLink);
  }
}

// Agregar estilos CSS para los estados nuevos
const style = document.createElement('style');
style.textContent = `
  .error-message {
    text-align: center;
    padding: 40px;
    color: #666;
  }
  .error-message p {
    margin: 10px 0;
  }
  .no-products {
    text-align: center;
    padding: 40px;
    color: #888;
  }
  .agotado {
    display: inline-block;
    background: #ff4444;
    color: white;
    padding: 3px 8px;
    border-radius: 3px;
    font-size: 12px;
    margin-top: 5px;
  }
  .pro:hover {
    transform: translateY(-5px);
    transition: transform 0.3s ease;
  }
`;
document.head.appendChild(style);

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
});

// También exportar para uso en otros archivos si es necesario
export { cargarProductos, mostrarProductos };