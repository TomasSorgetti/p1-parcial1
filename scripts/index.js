import { DiscoController } from "./disco.controller.js";

const discoController = new DiscoController();

//* Main functions
function cargar() {
  discoController.cargar();
}

function mostrar() {
  discoController.mostrar();
  
  
}

//* Event Listeners
const cargarButton = document.querySelector("#cargar");
const mostrarButton = document.querySelector("#mostrar");

cargarButton.addEventListener("click", cargar);
mostrarButton.addEventListener("click", mostrar);

document.addEventListener("DOMContentLoaded", function () {
  mostrar();
});
