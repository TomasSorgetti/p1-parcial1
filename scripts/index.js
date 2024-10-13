import { DiscoController } from "./disco.controller";

const discoController = new DiscoController();

//* Main functions
function cargar() {
  discoController.cargar();
}

function mostrar() {
  discoController.mostrar();
}

//* EVENT LISTENERS
const cargarButton = document.querySelector("#cargar");
const mostrarButton = document.querySelector("#mostrar");

cargarButton.addEventListener("click", cargar);
mostrarButton.addEventListener("click", mostrar);