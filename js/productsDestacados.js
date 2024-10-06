const featuredProductsContainer = document.querySelector('.swiper-wrapper');

const featuredProducts = products.slice(8, 16); // Obtener solo los primeros 8 productos destacados

// Suponiendo que tienes un array `featuredProducts` con productos
featuredProducts.forEach((product) => {
  const slide = document.createElement('div');
  slide.classList.add('swiper-slide');
  
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
        <h4>$${product.precio}</h4>
      </div>
      <a href="#"><i class="fa-solid fa-cart-shopping cart"></i></a>
    </div>
  `;
  
  slide.addEventListener("click", () => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "productDetails.html";
  });

  featuredProductsContainer.appendChild(slide);
});

// Inicializar Swiper **después** de que los productos han sido añadidos al DOM
const swiper = new Swiper('.swiper-container', {
    slidesPerView: 4, // Número de productos visibles en pantallas grandes
    spaceBetween: 20, // Espacio entre productos
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: { // Pantallas pequeñas
        slidesPerView: 1, // Muestra 1 producto en pantallas muy pequeñas
      },
      480: { // Pantallas pequeñas
        slidesPerView: 2, // Muestra 2 productos en pantallas pequeñas
      },
      640: { // Pantallas medianas
        slidesPerView: 3, // Muestra 3 productos en pantallas medianas
      },
      768: { // Pantallas más grandes
        slidesPerView: 4, // Muestra 4 productos en pantallas grandes
      },
      1024: {
        slidesPerView: 4, // Se mantiene en 4 para pantallas muy grandes
      },
    },
});
