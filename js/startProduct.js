//PRODUCTO ESTRELLA DEL INDEX

products.forEach((product) => {
  if (product.nombre == "PIZARRA MÁGICA 8,5") {
    const aStar = document.getElementById("a");

    aStar.addEventListener("click", () => {
      localStorage.setItem("productStar", JSON.stringify(product));
      localStorage.setItem("origenProducto", "index");
      window.location.href = "productDetails.html";
    });
  }
});
