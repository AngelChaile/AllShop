// BOTONES PARA ABRIR Y CERRAR MENU EN PANTALLAS PEQUEÑAS
const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

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

// NEWSLETTER
document.addEventListener("DOMContentLoaded", () => {
  const subscribeBtn = document.querySelector(".form button");
  const emailInput = document.querySelector('.form input[type="email"]');

  subscribeBtn.addEventListener("click", () => {
    Swal.fire({
      title: "Oops...!",
      text: "Lo sentimos momentaneamente no disponible",
      imageUrl: "img/emojiTriste.png",
      imageWidth: 150,
      imageHeight: 150,
      imageAlt: "Emoticon triste",
    });
    emailInput.value = "";
  });
});