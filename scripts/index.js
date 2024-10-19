import { DiscoController } from "./disco.controller.js";

const discoController = new DiscoController();

//* Main functions
function cargar() {
  discoController.cargar();
}
function cargarList() {
  discoController.cargarLista();
}

function mostrar() {
  discoController.mostrar();
}

function verStock(discoId) {
  alert(`Consultando el stock del disco con ID: ${discoId}`);
}

function retirarDisco(discoId) {
  alert(`Retirando el disco con ID: ${discoId}`);
}

//* Event Listeners
const cargarButton = document.querySelector("#cargar");
const cargarLista = document.querySelector("#cargarLista");
// const mostrarButton = document.querySelector("#mostrar");

cargarButton.addEventListener("click", cargar);
cargarLista.addEventListener("click", cargarList);
// mostrarButton.addEventListener("click", mostrar);

document.addEventListener("DOMContentLoaded", function () {
  mostrar();

  // Eventos para ver stock y retirar disco
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("card-btn-ver")) {
      const discoId = event.target.getAttribute("data-disco-id");
      verStock(discoId);
    }
    if (event.target.classList.contains("card-btn-pedir")) {
      const discoId = event.target.getAttribute("data-disco-id");
      retirarDisco(discoId);
    }
  });
});
