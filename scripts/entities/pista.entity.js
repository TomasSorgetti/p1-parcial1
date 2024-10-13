
// TODO => la duracion tiene que estar en cierto formato!!!!

export class Pista {
  #nombre;
  #duracion;
  constructor(nombre, duracion) {
    this.#nombre = nombre;
    this.#duracion = duracion;
  }

  get nombre() {
    return this.#nombre;
  }
  get duracion() {
    return this.#duracion;
  }
}
