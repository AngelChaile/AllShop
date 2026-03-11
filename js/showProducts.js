// showProducts.js - VERSIÓN COMPLETA CON BÚSQUEDA Y FILTROS
import { getProducts } from './supabase-client.js';
import { log, error } from './config.js';

const proContainer = document.getElementById("pro-container");
const productsPerPage = 8;
let currentPage = 1;
let allProducts = [];
let filteredProducts = [];
let categorias = [];
let currentCategoria = 'todos';
let currentSearchTerm = '';

// Función para cargar categorías
async function cargarCategorias() {
  try {
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .order('nombre');
    
    if (error) throw error;
    
    categorias = data || [];
    
    // Renderizar botones de filtro
    const filtersContainer = document.querySelector('.filters-container');
    if (filtersContainer) {
      // Limpiar contenedor (dejar solo el botón "Todos")
      filtersContainer.innerHTML = '<button class="filter-btn active" data-categoria="todos">Todos</button>';
      
      // Agregar botones por categoría
      categorias.forEach(cat => {
        filtersContainer.innerHTML += `
          <button class="filter-btn" data-categoria="${cat.id}">${cat.nombre}</button>
        `;
      });
      
      // Agregar event listeners a los botones
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          // Remover active de todos
          document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          // Agregar active al clickeado
          btn.classList.add('active');
          
          currentCategoria = btn.dataset.categoria;
          aplicarFiltros();
        });
      });
    }
  } catch (error) {
    console.error('Error cargando categorías:', error);
  }
}

// Función para aplicar filtros (búsqueda + categoría)
function aplicarFiltros() {
  // Filtrar por categoría
  let filtrados = allProducts;
  
  if (currentCategoria !== 'todos') {
    filtrados = filtrados.filter(p => p.categoria_id == currentCategoria);
  }
  
  // Filtrar por término de búsqueda
  if (currentSearchTerm.trim() !== '') {
    const term = currentSearchTerm.toLowerCase().trim();
    filtrados = filtrados.filter(p => 
      p.nombre.toLowerCase().includes(term) ||
      (p.detalle && p.detalle.toLowerCase().includes(term)) ||
      (p.descripcion && p.descripcion.toLowerCase().includes(term))
    );
  }
  
  filteredProducts = filtrados;
  currentPage = 1;
  mostrarProductos(1);
}

// Función para cargar productos desde Supabase
async function cargarProductos() {
  try {
    allProducts = await getProducts();
    
    // Adaptar estructura de Supabase
    allProducts = allProducts.map(product => ({
      id: product.id,
      nombre: product.nombre,
      detalle: product.detalle || '',
      descripcion: product.descripcion || '',
      precio: product.precio,
      precioOferta: product.precio_oferta,
      stock: product.stock || 0,
      categoria_id: product.categoria_id,
      img: Array.isArray(product.imagenes) && product.imagenes.length > 0 
        ? product.imagenes 
        : ['img/placeholder.jpg']
    }));
    
    log('Productos cargados:', allProducts.length);
    filteredProducts = [...allProducts];
    mostrarProductos(1);
    
    // Cargar categorías después de productos
    await cargarCategorias();
    
  } catch (error) {
    console.error('Error cargando productos:', error);
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
  if (filteredProducts.length === 0) {
    proContainer.innerHTML = '<p class="no-products">No hay productos que coincidan con tu búsqueda</p>';
    document.getElementById('pagination').innerHTML = '';
    return;
  }

  proContainer.innerHTML = "";

  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const paginatedProducts = filteredProducts.slice(start, end);

  paginatedProducts.forEach((product) => {
    const pro = document.createElement("div");
    pro.className = "pro";

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
  if (!pagination) return;
  
  pagination.innerHTML = "";
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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

// Agregar estilos CSS
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
    font-size: 18px;
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

// Event listeners para búsqueda
document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  
  // Búsqueda en tiempo real
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value;
      aplicarFiltros();
    });
  }
});

export { cargarProductos, mostrarProductos };