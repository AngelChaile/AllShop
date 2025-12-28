// featuredProducts.js - VERSIÓN MODIFICADA PARA SUPABASE
import { getProducts } from './supabase-client.js';

const featuredProductsContainer = document.querySelector(".swiper-wrapper");
let allProducts = [];
let swiperInstance = null;

// Función para cargar productos destacados
async function cargarProductosDestacados() {
  try {
    // Cargar productos desde Supabase
    const products = await getProducts();
    
    // Adaptar estructura de Supabase
    allProducts = products.map(product => ({
      id: product.id,
      nombre: product.nombre,
      detalle: product.detalle || '',
      descripcion: product.descripcion || '',
      precio: product.precio,
      precioOferta: product.precio_oferta,
      stock: product.stock || 0,
      destacado: product.destacado || false,
      img: Array.isArray(product.imagenes) && product.imagenes.length > 0 
        ? product.imagenes 
        : ['img/placeholder.jpg']
    }));
    
    // Filtrar productos destacados (máximo 17)
    const featuredProducts = allProducts
      .filter(product => product.destacado || product.stock > 0) // Destacados o con stock
      .slice(0, 17);
    
    // Limpiar contenedor
    featuredProductsContainer.innerHTML = '';
    
    // Si no hay productos destacados, mostrar mensaje
    if (featuredProducts.length === 0) {
      featuredProductsContainer.innerHTML = `
        <div class="no-featured-products">
          <p>Próximamente más productos destacados</p>
        </div>
      `;
      return;
    }
    
    // Crear slides para cada producto destacado
    featuredProducts.forEach((product) => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      
      // Usar la primera imagen del array
      const primeraImagen = product.img[0];
      
      slide.innerHTML = `
        <div class="pro">
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
            ${product.stock === 0 ? '<span class="agotado-featured">AGOTADO</span>' : ''}
          </div>
          <a href="#">
            <i class="fa-solid fa-cart-shopping cart"></i>
          </a>
        </div>
      `;
      
      // Evento click para ir a detalles del producto
      slide.addEventListener("click", () => {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "productDetails.html";
      });
      
      featuredProductsContainer.appendChild(slide);
    });
    
    // Inicializar o actualizar Swiper
    inicializarSwiper();
    
  } catch (error) {
    console.error('Error cargando productos destacados:', error);
    mostrarError();
  }
}

// Función para inicializar Swiper
function inicializarSwiper() {
  // Destruir instancia anterior si existe
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
  }
  
  // Crear nueva instancia
  swiperInstance = new Swiper(".swiper", {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      480: { slidesPerView: 2 },
      640: { slidesPerView: 2 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 4 },
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    observer: true,
    observeParents: true
  });
}

// Función para mostrar error
function mostrarError() {
  featuredProductsContainer.innerHTML = `
    <div class="error-carousel">
      <p>⚠️ No se pudieron cargar los productos destacados</p>
      <button id="reintentar-carousel" class="normal small">Reintentar</button>
    </div>
  `;
  
  // Evento para reintentar
  const reintentarBtn = document.getElementById("reintentar-carousel");
  if (reintentarBtn) {
    reintentarBtn.addEventListener("click", cargarProductosDestacados);
  }
}

// Agregar estilos CSS
const style = document.createElement('style');
style.textContent = `
  .no-featured-products {
    grid-column: 1 / -1;
    text-align: center;
    padding: 40px;
    color: #888;
    font-style: italic;
  }
  .error-carousel {
    grid-column: 1 / -1;
    text-align: center;
    padding: 30px;
    background: #fff8f8;
    border-radius: 8px;
  }
  .error-carousel p {
    margin-bottom: 15px;
    color: #d32f2f;
  }
  .agotado-featured {
    display: inline-block;
    background: #ff4444;
    color: white;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 11px;
    margin-top: 5px;
  }
  .swiper-slide {
    height: auto !important;
  }
  .swiper-slide .pro {
    height: 100%;
  }
  .normal.small {
    padding: 8px 16px;
    font-size: 14px;
  }
`;
document.head.appendChild(style);

// Cargar productos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Esperar a que Swiper esté cargado
  if (typeof Swiper === 'undefined') {
    // Si Swiper no está cargado, esperar un momento
    setTimeout(cargarProductosDestacados, 500);
  } else {
    cargarProductosDestacados();
  }
});

// Recargar cuando haya cambios en la ventana
window.addEventListener('resize', () => {
  if (swiperInstance) {
    swiperInstance.update();
  }
});

export { cargarProductosDestacados };