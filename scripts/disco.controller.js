import { DiscoService } from "./disco.service.js";
import { pedirDato } from "./utils/pedirDato.js";

export class DiscoController {
  constructor() {
    this.discoService = new DiscoService();
  }

  #pedirDatosDisco() {
    // Se pide el id del disco y se repite si ya existe o el id es incorrecto
    let discoId;
    do {
      discoId = pedirDato("Ingrese el ID del disco", true);
    } while (this.discoService.existsId(discoId));

    // Se piden los datos del disco
    const discoNombre = pedirDato("Ingrese el nombre del disco");
    const discoArtista = pedirDato("Ingrese el nombre del artista");
    const discoPortada = pedirDato("Ingrese la URL de la imagen del disco");
    const pistas = this.#pedirPistas();

    // Se retorna la data del disco
    return {
      id: discoId,
      nombre: discoNombre,
      artista: discoArtista,
      portada: discoPortada,
      pistas: pistas,
    };
  }

  #pedirPistas() {
    let pistas = [];

    function pedirPista() {
      const nombre = pedirDato("Ingrese el nombre de la pista");
      const duracion = pedirDato("Ingrese la duración de la pista", true);
      pistas.push({ nombre, duracion });

      if (confirm("¿Desea cargar otra pista?")) {
        pedirPista();
      }
    }
    pedirPista();

    return pistas;
  }
  /**
   * Carga un disco a la lista de discos y pregunta si se quiere cargar otro
   */
  cargar() {
    try {
      const datosDisco = this.#pedirDatosDisco();
      this.discoService.cargarDisco(datosDisco);
    } catch (error) {
      alert(error.message);
    }
  }

  /**
   * Muestra todos los discos en el DOM
   */
  mostrar() {
    console.log(this.discoService.getDiscos());
  }
}
