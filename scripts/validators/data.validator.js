// TODO => Revisar validaciones

export class Validator {
  static validateNumber(number) {
    // se parsea el string del prompt a un numero
    const parsedNumber = parseInt(number);

    // el metodo es para validar numero, no id (aunque el id es el único numero ingresado), no debería de validarse acá
    if (number < 1 || number > 999) {
      throw new Error("Debe ser mayor a 1 y menor a 999");
    }
    // si number es null o undefined, lanza un error
    if (number === null || number === undefined) {
      throw new Error("Debe de enviar un número");
    }
    // si el número parseado no es un número válido, lanza un error
    else if (isNaN(parsedNumber)) {
      throw new Error("Debe ser un número");
    }
    // si el numero es 0 o negativo, lanza un error
    else if (parsedNumber <= 0) {
      throw new Error("No puede ser menor a 1");
    }
    // retorna el numero si es correcto
    return parsedNumber;
  }

  static validateString(text) {
    // si el texto es null o undefined, lanza un error
    if (text === null || text === undefined) {
      throw new Error("Envie el texto");
    }
    // si el texto es vacío o tiene unicamente espacios, lanza un error
    else if (text.trim() === "") {
      throw new Error("El texto no puede estar vacío");
    }
    // si el texto es un número, lanza un error
    const isNumber = parseInt(text);
    if (!isNaN(isNumber)) {
      throw new Error("Debe ser un texto");
    }

    // retorna el texto sin espacios
    return text.trim();
  }
}
