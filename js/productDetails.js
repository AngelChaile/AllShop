// productDetails.js - VERSIÓN MODIFICADA PARA SUPABASE
import { addToCart } from "./cart.js";
import { getProductById } from "./supabase-client.js";

const productDetailsContainer = document.getElementById("prodetails");
let currentProduct = null;

// Función para cargar detalles del producto
async function cargarDetallesProducto() {
  try {
    // Obtener producto desde localStorage
    const productData = JSON.parse(localStorage.getItem("selectedProduct"));
    
    if (!productData || !productData.id) {
      mostrarError('No se seleccionó ningún producto');
      return;
    }
    
    // Si ya tenemos datos completos en localStorage, usarlos
    if (productData.descripcion && productData.precio && productData.img) {
      renderizarProducto(productData);
      currentProduct = productData;
      return;
    }
    
    // Si no, cargar desde Supabase usando el ID
    const producto = await getProductById(productData.id);
    
    if (!producto) {
      mostrarError('Producto no encontrado');
      return;
    }
    
    // Adaptar estructura de Supabase
    const productAdaptado = {
      id: producto.id,
      nombre: producto.nombre,
      detalle: producto.detalle || '',
      descripcion: producto.descripcion || '',
      precio: producto.precio,
      precioOferta: producto.precio_oferta,
      stock: producto.stock || 0,
      img: Array.isArray(producto.imagenes) && producto.imagenes.length > 0 
        ? producto.imagenes 
        : ['img/placeholder.jpg']
    };
    
    // Guardar en localStorage para futuras visitas
    localStorage.setItem("selectedProduct", JSON.stringify(productAdaptado));
    
    renderizarProducto(productAdaptado);
    currentProduct = productAdaptado;
    
  } catch (error) {
    console.error('Error cargando detalles:', error);
    
    // Intentar usar datos de localStorage como respaldo
    const productData = JSON.parse(localStorage.getItem("selectedProduct"));
    if (productData) {
      renderizarProducto(productData);
      currentProduct = productData;
    } else {
      mostrarError('No se pudieron cargar los detalles del producto');
    }
  }
}

// Función para renderizar el producto
function renderizarProducto(product) {
  const { id, nombre, precio, precioOferta, descripcion, img, stock } = product;
  
  // Crear las imágenes pequeñas dinámicamente
  const smallImgDivs = img
    .map((image, index) => {
      const imageUrl = image || 'img/placeholder.jpg';
      return `
        <div class="small-img-col">
          <img src="${imageUrl}" width="100%" class="small-img" alt="${nombre} ${index + 1}" />
        </div>
      `;
    })
    .join("");

  productDetailsContainer.innerHTML = `
    <div class="single-pro-image">
      <img src="${img[0] || 'img/placeholder.jpg'}" width="100%" id="MainImg" alt="${nombre}" />
      <div class="small-img-group">
        ${smallImgDivs}
      </div>
    </div>
    <div class="single-pro-details">
      <h6><a href="shop.html" style="color: #088178;">Inicio</a> / <a href="shop.html" style="color: #088178;">Tienda</a> / Producto</h6>
      <h4 id="product-title">${nombre}</h4>
      <div class="price-container">
        <span class="original-price">$${precio}</span>
        <span class="offer-price">$${precioOferta}</span>
      </div>
      <h4 id="product-stock">
        <span class="stock-label">Stock disponible:</span>
        <span class="stock-value" id="stockValue">${stock}</span>
      </h4>
      <button id="comprar" class="normal ${stock === 0 ? 'disabled' : ''}">
        ${stock === 0 ? 'AGOTADO' : 'Agregar al Carrito'}
      </button>
      <h4>Detalles del Producto</h4>
      <div class="product-description">
        ${descripcion || 'Descripción no disponible.'}
      </div>
    </div>
  `;
  
  // Configurar eventos de las imágenes pequeñas
  const mainImg = document.getElementById("MainImg");
  const smallImgs = document.querySelectorAll(".small-img");
  
  smallImgs.forEach((img) => {
    img.addEventListener("click", () => {
      mainImg.src = img.src;
      // Efecto visual al seleccionar imagen
      smallImgs.forEach(s => s.parentElement.classList.remove('active'));
      img.parentElement.classList.add('active');
    });
  });
  
  // Activar primera imagen por defecto
  if (smallImgs[0] && smallImgs[0].parentElement) {
    smallImgs[0].parentElement.classList.add('active');
  }
  
  // Configurar botón de compra
  const btnComprar = document.getElementById("comprar");
  if (btnComprar && !btnComprar.classList.contains('disabled')) {
    btnComprar.addEventListener("click", () => {
      addToCart(product);
      // Actualizar stock visualmente
      if (product.stock > 0) {
        product.stock--;
        document.getElementById('stockValue').textContent = product.stock;
        
        if (product.stock === 0) {
          btnComprar.textContent = 'AGOTADO';
          btnComprar.classList.add('disabled');
        }
      }
    });
  }
  
  // Agregar botón para continuar comprando
  const botonesAdicionales = document.createElement('div');
  botonesAdicionales.className = 'additional-buttons';
  botonesAdicionales.innerHTML = `
    <a href="shop.html" class="normal outline">← Seguir Comprando</a>
  `;
  
  const singleProDetails = document.querySelector('.single-pro-details');
  if (singleProDetails) {
    singleProDetails.appendChild(botonesAdicionales);
  }
}

// Función para mostrar error
function mostrarError(mensaje) {
  productDetailsContainer.innerHTML = `
    <div class="product-error">
      <div class="error-icon">⚠️</div>
      <h3>${mensaje}</h3>
      <p>Lo sentimos, no pudimos cargar los detalles del producto.</p>
      <a href="shop.html" class="normal">Volver a la Tienda</a>
    </div>
  `;
}

// Agregar estilos CSS
const style = document.createElement('style');
style.textContent = `
  .product-description {
    white-space: pre-wrap;
    line-height: 1.6;
    color: #465b52;
    font-family: inherit;
  }
  .disabled {
    background-color: #cccccc !important;
    cursor: not-allowed !important;
    opacity: 0.7;
  }
  .stock-value {
    color: ${currentProduct && currentProduct.stock > 0 ? '#088178' : '#ff4444'};
    font-weight: bold;
  }
  .stock-label {
    color: #666;
    font-weight: normal;
  }
  .small-img-col.active {
    border: 2px solid #088178;
    border-radius: 4px;
  }
  .small-img-col {
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .small-img-col:hover {
    opacity: 0.8;
  }
  .additional-buttons {
    margin-top: 30px;
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }
  .normal.outline {
    background: transparent;
    border: 2px solid #088178;
    color: #088178;
  }
  .normal.outline:hover {
    background: #088178;
    color: white;
  }
  .product-error {
    text-align: center;
    padding: 60px 20px;
    max-width: 600px;
    margin: 0 auto;
  }
  .product-error .error-icon {
    font-size: 48px;
    margin-bottom: 20px;
  }
  .product-error h3 {
    color: #d32f2f;
    margin-bottom: 15px;
  }
  .product-error p {
    color: #666;
    margin-bottom: 25px;
  }
`;
document.head.appendChild(style);

// Cargar detalles cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', cargarDetallesProducto);

// Exportar funciones si es necesario
export { cargarDetallesProducto, renderizarProducto };