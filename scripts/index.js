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

//* Event Listeners
const cargarButton = document.querySelector("#cargar");
const cargarLista = document.querySelector("#cargarLista");
// const mostrarButton = document.querySelector("#mostrar");

cargarButton.addEventListener("click", cargar);
cargarLista.addEventListener("click", cargarList);
// mostrarButton.addEventListener("click", mostrar);

document.addEventListener("DOMContentLoaded", function () {
  mostrar();
});
