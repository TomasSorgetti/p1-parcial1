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
   * Devuelve el html del disco
   * @returns {string}
   */
  getDiscoHtml() {
    let html = ``;
    html += `<div class="card"><div class="card-img-cont"><img src="${this.portada}" alt="${this.nombre} portada" /></div>\n`;
    html += `<div class="card-content"><h3>${this.nombre}</h3>\n`;
    html += `<p>${this.artista}</p><ul>\n`;

    this.pistas.forEach((pista) => {
      html += pista.getPistaHtml();
    });

    html += `</ul><div class="btn-container"><button class="card-btn-ver" data-disco-id="${this.id}">ver stock</button><button class="card-btn-pedir" data-disco-id="${this.id}">Pedir disco</button></div></div>`;
    return html;
  }
}
