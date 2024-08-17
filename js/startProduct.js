document.addEventListener("DOMContentLoaded", () => {
  //PRODUCTO ESTRELLA DEL INDEX
  const productStar = document.createElement("div");
  let sectionProdStar = document.getElementById("about-app");

  products.forEach((product) => {
    if (product.id == 17) {
      productStar.innerHTML = `
        <h1>
          Producto Estrella
          <a id="a" href="sproduct.html">Descubre la ${product.nombre}</a>
        </h1>
        <div class="video">
          <video
            controls
            autoplay
            loop
            src="img/productos/varios//PizarraMagica1.mp4"
            type="video/mp4"
          ></video>`;

      const aStar = document.getElementById("a");

      aStar.addEventListener("click", () => {
        localStorage.setItem("productStar", JSON.stringify(product));
        localStorage.setItem("origenProducto", "index");
        window.location.href = "sproduct.html";
      });
    }

    sectionProdStar.appendChild(productStar);
  });
});
