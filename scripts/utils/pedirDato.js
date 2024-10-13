import { Validator } from "../validators/data.validator";

/**
 *  Pide un dato al usuario y se asegura de que es un dato correcto, si no lo es, se repite el proceso.
 * @param {string} msg
 * @param {boolean} isNumber
 * @returns
 */
export function pedirDato(msg, isNumber = false) {
  // Se pide el dato al usuario
  const dato = prompt(msg);
  // Se valida el dato
  try {
    if (isNumber) {
      return Validator.validateNumber(dato);
    } else {
      return Validator.validateString(dato);
    }
  } catch (error) {
    // Si el dato no es válido, se avisa por alerta
    alert(error.message);
    // Se vuelve a pedir mediante la llamada recursiva
    return pedirDato(msg, isNumber);
  }
}







