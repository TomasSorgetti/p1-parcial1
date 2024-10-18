// TODO => Tiene que devolver un string con el disco completo

export class Disco {
  constructor({ id, nombre, artista, portada }) {
    this.id = id;
    this.nombre = nombre;
    this.artista = artista;
    this.portada = portada;
    this.pistas = [];
  }

  agregarPista(pista) {
    this.pistas.push(pista);
  }

  getDiscoHtml() {
    let html = ``;
    html += `<div class="card"><img src="${this.portada}" alt="${this.nombre} portada" />\n`;
    html += `<div><h3>${this.nombre}</h3>\n`;
    html += `<p>${this.artista}</p><ul>\n`;

    this.pistas.forEach((pista) => {
      html += pista.getPistaHtml();
    });

    html += `</ul></div></div>`;
    return html;
  }
}
