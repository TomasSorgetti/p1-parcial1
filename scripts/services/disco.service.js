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
      const newPista = new Pista(pista);
      console.log(newPista);

      newDisco.agregarPista(newPista);
    });
    // retorno el disco creado
    return this.catalogo.addDisco(newDisco);
  }

  /**
   * Carga la lista de discos desde el archivo JSON
   */
  async cargarLista() {
    await fetch("/discos.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((disco) => {
          const newDisco = new Disco({
            id: disco.id,
            nombre: disco.nombre,
            artista: disco.artista,
            portada: disco.portada,
          });
          disco.pistas.forEach((pista) => {
            const newPista = new Pista(pista);
            newDisco.agregarPista(newPista);
          });
          this.catalogo.addDisco(newDisco);
        });
      })
      .catch((error) => {
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
    const discosFound = this.catalogo.getDiscoByName(diskName);
    if (!discosFound || discosFound.length === 0) {
      throw new Error(`No se encontro el disco`);
    }

    const discos = document.querySelector("#discos");
    discos.innerHTML = "";

    if (discosFound.length === 0) {
      discos.innerHTML = `<p class="error">No se encontraron discos...</p>`;
    } else {
      discosFound.forEach((disco) => {
        discos.innerHTML += disco.getDiscoHtml();
      });
    }
  }

  /**
   * Muestra los discos en el dom
   */
  mostrarDiscos() {
    const discosFound = this.getDiscos();
    const discos = document.querySelector("#discos");
    if (discosFound.length === 0) {
      discos.innerHTML = `<p class="error">No se encontraron discos...</p>`;
    } else {
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
    const stockFound = this.catalogo.getStockById(discoId);
    if (!stockFound) {
      throw new Error(`No se encontro el disco con id ${discoId}`);
    }
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
