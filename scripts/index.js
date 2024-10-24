import { DiscoController } from "./controllers/disco.controller.js";

const discoController = new DiscoController();

//* Main functions
/**
 * Carga un disco a la lista de discos y pregunta si se quiere cargar otro
 */
function cargar() {
  discoController.cargar();
}
/**
 * Carga todos los discos de la lista predefinida y muestra los discos
 */
function cargarList() {
  discoController.cargarLista();
}

/**
 * Muestra todos los discos en el DOM
 */
function mostrar() {
  discoController.mostrar();
}

/**
 * Busca un disco por su id y muestra su stock
 * @param {number} discoId
 */
function verStock(discoId) {
  console.log("viendo stock", discoId);

  discoController.getStock(discoId);
}

/**
 * Busca un disco por su id y le resta 1 a su stock
 * @param {number} discoId
 */
function retirarDisco(discoId) {
  discoController.removeStock(discoId);
}

/**
 * Busca un disco por su nombre y muestra su stock
 */
function getDiscoByName() {
  const diskName = searchButton.parentElement.querySelector("input").value;
  discoController.getDiscoByName(diskName);
}

//* Event Listeners
const cargarButton = document.querySelector("#cargar");
const cargarLista = document.querySelector("#cargarLista");
const searchButton = document.querySelector("#searchButton");

cargarButton.addEventListener("click", cargar);
cargarLista.addEventListener("click", cargarList);
searchButton.addEventListener("click", getDiscoByName);

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
