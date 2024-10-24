export class Disco {
  constructor({ id, nombre, artista, portada }) {
    this.id = id;
    this.nombre = nombre;
    this.artista = artista;
    this.portada = portada;
    this.pistas = [];
  }

  /**
   * Agrega una pista
   * @param {Pista} pista
   */
  agregarPista(pista) {
    this.pistas.push(pista);
  }

  /**
   * Obtiene la cantidad de pistas
   * @returns {number}
   */
  #getPistaAmount() {
    return this.pistas.length;
  }

  #getDiskDuration() {
    let duration = 0;
    this.pistas.forEach((pista) => {
      duration += pista.duracionOriginal;
    });
    const date = new Date(duration * 1000);

    let hh = date.getUTCHours().toString();
    let mm = date.getUTCMinutes().toString();
    let ss = date.getUTCSeconds().toString();

    return `${hh}:${mm}:${ss}`;
  }

  #getDiskDurationPromedio() {
    let duration = 0;
    this.pistas.forEach((pista) => {
      duration += pista.duracionOriginal;
    });

    const promedio = duration / this.pistas.length;
    // TODO => hacer esto en una funcion en utils, para poder ser reutilizada
    // TODO => debe ir un 0 antes de cada numero
    const date = new Date(promedio * 1000);

    let hh = date.getUTCHours().toString();
    let mm = date.getUTCMinutes().toString();
    let ss = date.getUTCSeconds().toString();

    if (hh !== "0") return `${hh}:${mm}:${ss}`;
    return `${mm}:${ss}`;
  }

  /**
   * Devuelve el html del disco
   * @returns {string}
   */
  getDiscoHtml() {
    let html = ``;
    html += `<div class="card"><div class="card-img-cont"><span class="disk_duration">${this.#getDiskDuration()}</span><img src="${
      this.portada
    }" alt="${this.nombre} portada" /></div>\n`;
    html += `<div class="card-content"><h3>${this.nombre}</h3>\n`;
    html += `<p>${this.artista}</p>\n`;

    html += `<div><p class="card-pista-amount">Cantidad de pistas: <span>${this.#getPistaAmount()}</span></p>\n`;
    html += `<p class="card-pista-amount">Promedio de duración de pista: <span>${this.#getDiskDurationPromedio()}</span></p></div><ul>\n`;
    // agrego las pistas
    this.pistas.forEach((pista) => {
      html += pista.getPistaHtml();
    });

    html += `</ul><div class="btn-container"><button class="card-btn-ver" data-disco-id="${this.id}">ver stock</button><button class="card-btn-pedir" data-disco-id="${this.id}">Pedir disco</button></div></div>`;
    return html;
  }
}
