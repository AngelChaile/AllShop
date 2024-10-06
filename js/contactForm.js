const inputName = document.querySelector("#nombre");
const inputEmail = document.querySelector("#email");
const inputSubject = document.querySelector("#asunto");
const inputMessage = document.querySelector("#mensaje");
const btnSubmit = document.querySelector("#contact-form button[type='submit']");
const formulario = document.querySelector("#contact-form");

const email = {
  name: "",
  email: "",
  asunto: "",
  message: "",
};

// Asignar Eventos
inputName.addEventListener("input", validar);
inputEmail.addEventListener("input", validar);
inputSubject.addEventListener("input", validar);
inputMessage.addEventListener("input", validar);

function validar(event) {
  const campo = event.target;
  const valor = campo.value.trim();

  if (valor === "") {
    mostrarAlerta(`El campo ${campo.placeholder} es obligatorio`, campo);
    email[campo.name] = "";
    comprobarEmail();
    return;
  }

  if (campo.id === "email" && !validarEmail(valor)) {
    mostrarAlerta("El email no es válido", campo);
    email[campo.name] = "";
    comprobarEmail();
    return;
  }

  limpiarAlerta(campo);

  email[campo.name] = valor.toLowerCase();

  comprobarEmail();
}

function mostrarAlerta(message, campo) {
  limpiarAlerta(campo);

  // Añadir clase de error al campo
  campo.classList.add("input-error");

  const error = document.createElement("p");
  error.textContent = message;
  error.classList.add("alerta-error");

  // Insertar el mensaje de error después del campo
  campo.parentElement.insertBefore(error, campo.nextSibling);
}

function limpiarAlerta(campo) {
  campo.classList.remove("input-error");

  const alerta = campo.parentElement.querySelector(".alerta-error");
  if (alerta) {
    alerta.remove();
  }
}

function validarEmail(email) {
  const val = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  return val.test(email);
}

function comprobarEmail() {
  if (Object.values(email).includes("")) {
    btnSubmit.disabled = true;
    return;
  }
  btnSubmit.disabled = false;
}

formulario.addEventListener("submit", function (event) {
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
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      Swal.fire({
        title: "Mensaje enviado correctamente",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      formulario.reset();
      // Resetear el objeto de email
      for (let key in email) {
        email[key] = "";
      }
      comprobarEmail();
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
