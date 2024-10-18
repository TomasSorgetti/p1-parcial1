import { Catalogo } from "./entities/catalogo.entity.js";
import { Disco } from "./entities/disco.entity.js";

export class DiscoService {
  constructor() {
    this.catalogo = new Catalogo();
  }

  cargarDisco({ id, nombre, artista, portada, pistas }) {
    // uso destructuring en las props para facilitar la escritura y por si me equiboco en el orden de las props
    // creo un disco nuevo
    const newDisco = new Disco({ id, nombre, artista, portada });
    // le agrego las pistas al disco creado
    pistas.forEach((pista) => newDisco.agregarPista(pista));
    // retorno el disco creado
    return this.catalogo.addDisco(newDisco);
  }

  async cargarLista() {
    await fetch("/discos.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((disco) => {
          const newDisco = new Disco(
            disco.id,
            disco.nombre,
            disco.artista,
            disco.portada,
            disco.pistas
          );
          this.catalogo.addDisco(newDisco);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  existsId(id) {
    return this.catalogo.validarId(id);
  }
  getDiscos() {
    return this.catalogo.discos;
  }
}
