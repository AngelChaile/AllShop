const featuredProductsContainer = document.querySelector(".swiper-wrapper");

// Obtener solo 14 productos destacados
const featuredProducts = products.slice(0, 14); 

featuredProducts.forEach((product) => {
  const slide = document.createElement("div");
  slide.classList.add("swiper-slide");

  slide.innerHTML = `
    <div class="pro">
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
    </div>
  `;

  // Cuando el usuario haga clic en la tarjeta, ir a la página de detalles del producto
  slide.addEventListener("click", () => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "productDetails.html";
  });

  // Agregar la tarjeta de producto al contenedor Swiper
  featuredProductsContainer.appendChild(slide);
});

// Inicializar Swiper después de que los productos han sido añadidos al DOM
const swiper = new Swiper(".swiper", {
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
});




