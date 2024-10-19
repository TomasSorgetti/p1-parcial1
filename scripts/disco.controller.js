import { DiscoService } from "./disco.service.js";
import { pedirDato } from "./utils/pedirDato.js";

export class DiscoController {
  constructor() {
    this.discoService = new DiscoService();
  }

  #pedirDatosDisco() {
    let discoId;
    const pedirIdDisco = () => {
      // Se pide el id del disco
      const idPedido = pedirDato("Ingrese el ID del disco", true);

      // Si el id ya existe, se avisa por alerta y se vuelve a pedir
      if (this.discoService.existsId(idPedido)) {
        alert("Ya existe un disco con ese ID. Ingrese otro nuevamente");
        return pedirIdDisco();
      }

      discoId = idPedido;
    };

    pedirIdDisco();

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
    //pido los datos del disco
    const datosDisco = this.#pedirDatosDisco();
    // le mando los datos al servicio
    const disco = this.discoService.cargarDisco(datosDisco);
    // si se crea el disco correctamente, se muestra en el DOM automaticamente
    if (disco) this.mostrar();
  }

  /**
   * Metodo asincrono que carga todos los discos de la lista predefinida.
   */
  async cargarLista() {
    await this.discoService.cargarLista();
    // Manda a mostrar los discos automaticamente
    this.mostrar();
  }

  /**
   * Muestra todos los discos en el DOM
   */
  mostrar() {
    // busco los discos
    this.discoService.mostrarDiscos();
  }
}
