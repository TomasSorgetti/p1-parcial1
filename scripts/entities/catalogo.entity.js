/**
 * Clase Catalogo, contiene la lista de discos y el stock
 */
export class Catalogo {
  discos;
  stock;
  constructor() {
    this.discos = [];
    this.stock = [];
  }

  get discos() {
    return this.discos;
  }

  /**
   * Agrega un disco a la lista de discos y a su stock
   * @param {Disco} disco
   * @returns
   */
  addDisco(disco) {
    this.discos.push(disco);
    this.addStock(disco);
    return disco;
  }

  /**
   * Busca un disco por su nombre
   * @param {string} diskName
   * @returns
   */
  getDiscoByName(diskName) {
    return this.discos.filter((disco) =>
      disco.nombre.toLowerCase().includes(diskName.toLowerCase())
    );
  }

  /**
   * Busca un disco por su id y le suma 1 a su stock, si no lo encuentra, lo agrega a la lista de stock
   * @param {Disco} disco
   */
  addStock(disco) {
    const diskFound = this.getStockById(disco.id);
    if (diskFound) {
      diskFound.stock += 1;
    } else {
      this.stock.push({ disco, stock: 1 });
    }
  }

  /**
   * Busca un disco por su id
   * @param {number} discoId
   * @returns
   */
  getStockById(discoId) {
    const diskFound = this.stock.find(
      (disk) => disk.disco.id === Number(discoId)
    );
    return diskFound;
  }

  /**
   * Busca un disco por su id y le resta 1 a su stock
   * @param {number} discoId
   * @returns
   */
  removeStock(discoId) {
    const diskFound = this.getStockById(discoId);
    if (!diskFound || diskFound.stock < 1) {
      throw new Error(`No hay stock del disco ${diskFound.disco.nombre}`);
    }
    if (diskFound && diskFound.stock >= 1) {
      diskFound.stock -= 1;
      return diskFound.stock;
    }
  }
  /**
   * Recive un id y valida si ya existe
   * @param {number} id
   * @returns
   */
  validarId(id) {
    return this.discos.some((disco) => disco.id === id);
  }
}
