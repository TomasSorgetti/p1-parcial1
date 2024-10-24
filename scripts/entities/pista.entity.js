// TODO => la duracion debe convertirse a formato hh:mm:ss cuando se crea la pista, no luego
// TODO => si el máximo son 2 horas, debería modificar el metodo para convertir los segundos en formato m:s a hh:mm:ss

export class Pista {
  #nombre;
  #duracion;
  #duracionOriginal;

  //al constructor le llega un objeto, por eso el destructuring
  constructor({ nombre, duracion }) {
    this.#nombre = nombre;
    this.#duracionOriginal = duracion;
    this.#duracion = this.pistaFormat(duracion);
  }
  get nombre() {
    return this.#nombre;
  }
  get duracion() {
    return this.#duracion;
  }
  get duracionOriginal() {
    return this.#duracionOriginal;
  }

  /**
   *  Metodo para obtener la duracion de la pista en formato m:s
   * @returns {string}
   */
  pistaFormat(duracion) {
    // TODO => usar el objeto Date de javascript
    // TODO => hacer esto en una funcion en utils, para poder ser reutilizada
    // TODO => debe ir un 0 antes de cada numero

    const date = new Date(Number(duracion) * 1000);

    let hh = date.getUTCHours().toString();
    let mm = date.getUTCMinutes().toString();
    let ss = date.getUTCSeconds().toString();

    if (hh !== "0") return `${hh}:${mm}:${ss}`;
    return `${mm}:${ss}`;
  }

  /**
   * Metodo para obtener el html de la pista
   * @returns {string}
   */
  getPistaHtml() {
    return `<li><h4>${this.nombre}</h4><span class="${
      this.#duracionOriginal > 180 ? "long_duration" : "short_duration"
    }">${this.duracion}</span></li>`;
  }
}
