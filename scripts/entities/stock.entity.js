export class Stock {
  #stock;
  constructor() {
    this.#stock = [];
  }

  /**
   * Busca el stock de un disco por nombre y lo devuelve
   * @param {string} diskName
   * @returns
   */
  getStock(diskName) {
    return this.#stock.find((disk) => disk.name === diskName);
  }

  /**
   * Agrega un disco al stock, si ya existe le suma 1, sino, lo crea
   * @param {string} diskName
   */
  addStock(diskName) {
    const diskFound = this.getStock(diskName);
    if (diskFound) {
      diskFound.stock += 1;
    } else {
      this.#stock.push({ name: diskName, stock: 1 });
    }
  }

  /**
   * resta el stock de un disco en el catalogo si el stock es mayor o igual a 1
   * @param {string} diskName
   */
  removeStock(diskName) {
    const diskFound = this.getStock(diskName);
    if (diskFound && diskFound.stock >= 1) {
      diskFound.stock -= 1;
    }
    // TODO => notificar que no no hay stock
  }
}
