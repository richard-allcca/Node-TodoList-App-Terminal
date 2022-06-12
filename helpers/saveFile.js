const fs = require("fs");

const archivo = "./db/data.json";

/**
 * * Importante convertir el objeto a un string para poder guardarlo en el archivo.
 * This function takes in a data parameter, and then writes that data to a file called archivo.
 * @param data - The data to write. This can be a string, a buffer, a stream, or an object.
 */
const guardarDb = (data) => {
  fs.writeFileSync(archivo, JSON.stringify(data));
};


/**
 * * Importante convertir el string a un objeto para poder leerlo.
 * If the file doesn't exist, return null. Otherwise, read the file and return the parsed JSON.
 * @returns the value of the variable tareasDb.
 */
const leerDb = () => {
  if (!fs.existsSync(archivo)) {
    return null;
  }
  const tareasDb = JSON.parse(fs.readFileSync(archivo, "utf8"));

  return tareasDb;
};


module.exports = {
  guardarDb,
  leerDb,
};
