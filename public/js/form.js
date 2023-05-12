const form = document.querySelector("#my-form");
const submitBtn = document.querySelector("#submit-btn");
const modal = document.querySelector("#modal");

submitBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  modal.style.display = "flex";

  try {
    const nombre = form.elements.nombre.value;
    const escenario = form.elements.escenario.value;

    window.location.href = `/historia?nombre=${nombre}&escenario=${escenario}`;
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});

// Agregar un intervalo para mostrar el modal mientras se espera la respuesta
let interval;
const checkResponse = () => {
  if (document.title === "Historia") {
    clearInterval(interval);
    modal.style.display = "none";
  }
};
interval = setInterval(checkResponse, 2000);