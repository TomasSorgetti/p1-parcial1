import { DiscoService } from "../services/disco.service.js";
import { pedirDato } from "../utils/pedirDato.js";

export class DiscoController {
  constructor() {
    this.discoService = new DiscoService();
  }

  /**
   * Pide los datos del disco
   * @returns { { id: number, nombre: string, artista: string, portada: string, pistas: { nombre: string, duracion: string}[] } }
   */
  #pedirDatosDisco() {
    let discoId;
    const pedirIdDisco = () => {
      // Se pide el id del disco
      const idPedido = pedirDato("Ingrese el ID del disco", true);
      if (idPedido < 1 || idPedido > 999) {
        alert("Debe ser mayor a 1 y menor a 999");
        return pedirIdDisco();
      }
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

  /**
   * Pide los datos de las pistas
   * @returns { { id: number, nombre: string, artista: string, portada: string, pistas: { nombre: string, duracion: string}[] } }
   */
  #pedirPistas() {
    let pistas = [];

    function pedirPista() {
      // pido el nombre de la pista
      const nombre = pedirDato("Ingrese el nombre de la pista");
      // pido la duracion de la pista
      let duracion;
      let condition = false;
      do {
        // la validación de la duración se hace en el validador
        duracion = pedirDato(
          "Ingrese la duración de la pista en segundos",
          true
        );
        // si la duracion es negativa, se vuelve a pedir
        if (duracion < 0) {
          alert("La duración no puede ser negativa");
          condition = true;
          // si la duracion es mayor a 2 horas, se vuelve a pedir
          // TODO => si el máximo son 2 horas, debería modificar el metodo para convertir los segundos en formato m:s a hh:mm:ss
        } else if (duracion > 7200) {
          alert("La duración no puede ser mayor a 2 horas");
          condition = true;
        } else {
          condition = false;
        }
      } while (condition);

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
      //pido los datos del disco
      const datosDisco = this.#pedirDatosDisco();
      // le mando los datos al servicio
      const disco = this.discoService.cargarDisco(datosDisco);
      // si se crea el disco correctamente, se muestra en el DOM automaticamente
      if (disco) this.mostrar();
    } catch (error) {
      alert(error.message);
    }
  }

  /**
   * Metodo asincrono que carga todos los discos de la lista predefinida.
   */
  async cargarLista() {
    try {
      await this.discoService.cargarLista();
      // Manda a mostrar los discos automaticamente
      this.mostrar();
    } catch (error) {
      alert(error.message);
    }
  }

  /**
   * Muestra todos los discos en el DOM
   */
  mostrar() {
    try {
      // busco los discos
      this.discoService.mostrarDiscos();
    } catch (error) {
      alert(error.message);
    }
  }

  /**
   * Manda a obtener el stock de un disco y lo muestra por alerta
   * @param {number} discoId
   */
  getStock(discoId) {
    try {
      const stock = this.discoService.getStock(discoId);
      alert(`El stock del disco es: ${stock}`);
    } catch (error) {
      alert(error.message);
    }
  }

  /**
   * manda a obtener un disco por su nombre
   * @param {string} diskName
   */
  getDiscoByName(diskName) {
    try {
      this.discoService.getDiscoByName(diskName);
    } catch (error) {
      alert(error.message);
    }
  }

  /**
   * Manda a eliminar el stock de un disco
   * @param {number} discoId
   */
  removeStock(discoId) {
    try {
      const stock = this.discoService.removeStock(discoId);
      alert(`Se retiró un disco. Quedan ${stock} disco(s) en stock`);
    } catch (error) {
      alert(error.message);
    }
  }
}
