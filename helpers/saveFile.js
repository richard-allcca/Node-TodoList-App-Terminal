const fs = require("fs");
const path = require("path");

const archivo = path.join(__dirname, "..", "db", "data.json");

/**
 * * Importante convertir el objeto a un string para poder guardarlo en el archivo.
 * This function takes in a data parameter, and then writes that data to a file called archivo.
 * @param data - The data to write. This can be a string, a buffer, a stream, or an object.
 */
const guardarDb = (data, archivoDb = archivo) => {
  const archivoTemporal = `${archivoDb}.${process.pid}.tmp`;

  try {
    fs.writeFileSync(archivoTemporal, JSON.stringify(data), "utf8");
    fs.renameSync(archivoTemporal, archivoDb);
  } catch (error) {
    try {
      fs.unlinkSync(archivoTemporal);
    } catch {}
    throw error;
  }
};


/**
 * * Importante convertir el string a un objeto para poder leerlo.
 * If the file doesn't exist, return null. Otherwise, read the file and return the parsed JSON.
 * @returns the value of the variable tareasDb.
 */
const leerDb = (archivoDb = archivo) => {
  if (!fs.existsSync(archivoDb)) {
    return null;
  }

  let tareasDb;
  try {
    tareasDb = JSON.parse(fs.readFileSync(archivoDb, "utf8"));
  } catch (error) {
    throw new Error(`JSON inválido en ${archivoDb}: ${error.message}`);
  }

  if (!Array.isArray(tareasDb)) {
    throw new Error(`El archivo ${archivoDb} debe contener una lista de tareas.`);
  }

  return tareasDb;
};


module.exports = {
  guardarDb,
  leerDb,
};
