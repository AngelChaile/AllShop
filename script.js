const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

/* div para productos */
const proContainer = document.getElementById("pro-container");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}




products.forEach((product) => {
  let pro = document.createElement("div");
  pro.className = "pro";

  pro.innerHTML = `
    <img src="${product.img[0]}" alt="">
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
                    <h4>$ ${product.precio}</h4>
                </div>
                <a href="#"><i class="fa-solid fa-cart-shopping cart"></i></a>
                `;

  pro.addEventListener("click", () => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "sproduct.html";
  });

  proContainer.append(pro);
});


