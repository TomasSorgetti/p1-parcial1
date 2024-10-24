import { Catalogo } from "../entities/catalogo.entity.js";
import { Disco } from "../entities/disco.entity.js";
import { Pista } from "../entities/pista.entity.js";

export class DiscoService {
  constructor() {
    this.catalogo = new Catalogo();
  }

  /**
   * Crea una instancia de disco, le agrega las pistas y manda a agregarlo al catálogo
   * @param { { id: number, nombre: string, artista: string, portada: string, pistas: { nombre: string, duracion: string}[] }} disco
   * @returns
   */
  cargarDisco({ id, nombre, artista, portada, pistas }) {
    // uso destructuring en las props para facilitar la escritura y por si me equiboco en el orden de las props
    // creo un disco nuevo
    const newDisco = new Disco({ id, nombre, artista, portada });
    // le agrego las pistas al disco creado
    pistas.forEach((pista) => {
      // por cada pista creo una nueva instancia de Pista
      const newPista = new Pista(pista);
      // agrego la pista al disco
      newDisco.agregarPista(newPista);
    });
    // retorno el disco creado
    return this.catalogo.addDisco(newDisco);
  }

  /**
   * Carga la lista de discos desde el archivo JSON
   */
  async cargarLista() {
    // no funciona la petición a /discos.json con el sitio deployado
    // await fetch("/discos.json")
    await fetch("https://tomassorgetti.github.io/p1-parcial1/discos.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((disco) => {
          //por cada disco obtenido, creo una instancia de Disco
          // TODO => validar si el id del disco ya existe
          const newDisco = new Disco({
            id: disco.id,
            nombre: disco.nombre,
            artista: disco.artista,
            portada: disco.portada,
          });
          disco.pistas.forEach((pista) => {
            //por cada pista, creo una instancia de Pista
            const newPista = new Pista(pista);
            //agrego la pista al disco
            newDisco.agregarPista(newPista);
          });
          //agrego el disco nuevo al catálogo
          this.catalogo.addDisco(newDisco);
        });
      })
      .catch((error) => {
        //si hay un error (no debería de ocurrir porque es un archivo local), lanzo un error para que lo agarre el controller
        console.error("No se pudo cargar la lista de discos:", error);
        throw new Error("No se pudo cargar la lista de discos");
      });
  }

  /**
   * manda a validar un id
   * @param {number} id
   * @returns
   */
  existsId(id) {
    return this.catalogo.validarId(id);
  }

  /**
   * Retorna la lista de discos
   * @returns {Disco[]}
   */
  getDiscos() {
    return this.catalogo.discos;
  }

  /**
   * Busca un disco por su nombre y lo muestra en el dom
   * @param {string} diskName
   */
  getDiscoByName(diskName) {
    // TODO => parte de esta función hace lo mismo que mostrarDiscos, se podría hacer un metodo para reutilizar
    // busco el disco
    const discosFound = this.catalogo.getDiscoByName(diskName);
    // si no se encontro el disco, lanza un error
    // if (!discosFound || discosFound.length === 0) {
    //   throw new Error(`No se encontro el disco`);
    // }

    // busco el div donde se muestran los discos
    const discos = document.querySelector("#discos");
    discos.innerHTML = "";

    // Si no hay discos agregados, muestra un mensaje de error
    if (discosFound.length === 0) {
      discos.innerHTML = `<p class="error">No se encontraron discos...</p>`;
    } else {
      discosFound.forEach((disco) => {
        // por cada disco en el catalogo, lo agrego al dom
        discos.innerHTML += disco.getDiscoHtml();
      });
    }
  }

  /**
   * Muestra los discos en el dom
   */
  mostrarDiscos() {
    // TODO => parte de esta función hace lo mismo que getDiscoByName, se podría hacer un metodo para reutilizar
    // busco los discos
    const discosFound = this.getDiscos();
    // busco el div donde se muestran los discos
    const discos = document.querySelector("#discos");

    // si no hay discos agregados, muestra un mensaje de error
    if (discosFound.length === 0) {
      discos.innerHTML = `<p class="error">No se encontraron discos...</p>`;
    } else {
      // agrego los discos al dom
      discos.innerHTML = "";
      discosFound.forEach((disco) => {
        discos.innerHTML += disco.getDiscoHtml();
      });
    }
  }

  /**
   * Retorna el stock del disco
   * @param {number} discoId
   * @returns
   */
  getStock(discoId) {
    // busco el stock del disco
    const stockFound = this.catalogo.getStockById(discoId);
    // si no se encontro el disco, lanza un error
    if (!stockFound) {
      throw new Error(`No se encontro el disco con id ${discoId}`);
    }
    // devuelvo el stock
    return stockFound.stock;
  }

  /**
   * Elimina el stock del disco
   * @param {number} discoId
   * @returns
   */
  removeStock(discoId) {
    return this.catalogo.removeStock(discoId);
  }
}
