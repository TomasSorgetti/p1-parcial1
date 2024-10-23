// TODO => la duracion debe convertirse a formato hh:mm:ss cuando se crea la pista, no luego

export class Pista {
  #nombre;
  #duracion;

  //al constructor le llega un objeto, por eso el destructuring
  constructor({ nombre, duracion }) {
    this.#nombre = nombre;
    this.#duracion = this.pistaFormat(duracion);
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
  pistaFormat(duracion) {
    // TODO => usar el objeto Date de javascript
    // const minutos = Math.floor(duracion / 60);
    // const segundos = this.duracion % 60;
    // return `${minutos}:${segundos.toString().padStart(2, "0")}`;

    const date = new Date(Number(duracion) * 1000);

    let mm = date.getUTCMinutes().toString();
    let ss = date.getUTCSeconds().toString();

    return `${mm}:${ss}`;
  }

  /**
   * Metodo para obtener el html de la pista
   * @returns {string}
   */
  getPistaHtml() {
    return `<li><h4>${this.nombre}</h4><span>${this.duracion}</span></li>`;
  }
}
