import { Catalogo } from "./entities/catalogo.entity.js";
import { Disco } from "./entities/disco.entity.js";
import { Pista } from "./entities/pista.entity.js";

export class DiscoService {
  constructor() {
    this.catalogo = new Catalogo();
  }

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
        console.log(error);
      });
  }

  existsId(id) {
    return this.catalogo.validarId(id);
  }
  getDiscos() {
    return this.catalogo.discos;
  }
  mostrarDiscos() {
    const discosFound = this.getDiscos();
    console.log(discosFound);

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
}
