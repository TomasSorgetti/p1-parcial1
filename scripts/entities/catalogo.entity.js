export class Catalogo {
  #discos;
  constructor() {
    this.#discos = [];
  }

  get discos() {
    return this.#discos;
  }

  addDisco(disco) {
    this.#discos.push(disco);
  }

  validarId(id) {
    return this.#discos.some((disco) => disco.id === id);
  }
}
