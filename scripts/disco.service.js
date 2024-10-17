import { Catalogo } from "./entities/catalogo.entity.js";
import { Disco } from "./entities/disco.entity.js";

export class DiscoService {
  constructor() {
    this.catalogo = new Catalogo();
  }

  cargarDisco({ id, nombre, artista, portada, pistas }) {
    const newDisco = new Disco({ id, nombre, artista, portada });
    pistas.forEach((pista) => newDisco.agregarPista(pista));
    this.catalogo.addDisco(newDisco);
  }
  existsId(id) {
    return this.catalogo.validarId(id);
  }

  getDiscos() {
    return this.catalogo.discos;
  }
}
