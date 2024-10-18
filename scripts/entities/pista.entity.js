// TODO => la duracion tiene que estar en cierto formato

export class Pista {
  #nombre;
  #duracion;
  //al constructor le llega un objeto, por eso el destructuring
  constructor({ nombre, duracion }) {
    this.#nombre = nombre;
    this.#duracion = duracion;
  }
  get nombre() {
    return this.#nombre;
  }
  get duracion() {
    return this.#duracion;
  }

  /**
   *  Metodo para obtener la duracion de la pista en formato m:s
   * @returns {string}
   */
  pistaFormat() {
    // busco los minutos
    const minutos = Math.floor(this.duracion / 60);
    // busco los segundos
    const segundos = this.duracion % 60;
    // retorno el formato m:s
    return `${minutos}:${segundos.toString().padStart(2, "0")}`;
  }

  /**
   * Metodo para obtener el html de la pista
   * @returns {string}
   */
  getPistaHtml() {
    return `<li><h4>${this.nombre}</h4><span>${this.pistaFormat()}</span></li>`;
  }
}
