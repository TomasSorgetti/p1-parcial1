import { Stock } from "./stock.entity.js";

/**
 * Clase Catalogo, contiene la lista de discos y el stock
 */
export class Catalogo {
  #discos;
  #stock;
  constructor() {
    this.#discos = [];
    this.#stock = new Stock();
  }

  get discos() {
    return this.#discos;
  }
  addDisco(disco) {
    this.#discos.push(disco);
    this.#stock.addStock(disco.nombre);
    return disco;
  }
  removeStock(diskName) {
    this.#stock.removeStock(diskName);
  }

  /**
   * Recive un id y valida si ya existe
   * @param {number} id
   * @returns
   */
  validarId(id) {
    return this.#discos.some((disco) => disco.id === id);
  }
}
