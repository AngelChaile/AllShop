/* const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const inputSubject = document.querySelector("#subject");
const inputMessage = document.querySelector("#message");

inputName.addEventListener("blur", validar);
inputEmail.addEventListener("blur", validar);
inputSubject.addEventListener("blur", validar);
inputMessage.addEventListener("blur", validar);

function validar(event) {
  if (event.target.value.trim() === '') {
    console.log('esta vacio');
  } else {
    console.log('hay algo')
  }
} */

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Mostrar mensaje de "Enviando..."
    Swal.fire({
      title: "Enviando...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Datos del formulario
    const formData = new FormData(this);
    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    // Enviar la solicitud con Fetch
    fetch("https://formsubmit.co/ajax/chaileenzo195@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          title: "Mensaje enviado correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("contact-form").reset();
      })
      .catch((error) => {
        Swal.fire({
          title: "Hubo un error al enviar el mensaje, intenta nuevamente.",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error("Error:", error);
      });
  });
