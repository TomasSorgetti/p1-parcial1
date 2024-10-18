// TODO => Tiene que devolver un string con el disco completo

export class Disco {
  constructor({id, nombre, artista, portada}) {
    this.id = id;
    this.nombre = nombre;
    this.artista = artista;
    this.portada = portada;
    this.pistas = [];
  }

  agregarPista(pista) {
    this.pistas.push(pista);
  }
}
