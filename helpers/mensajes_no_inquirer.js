//! este archivo no se utiliza porque solo es una demostración
require("colors");

const mostrarMenu = () => {

  return new Promise((resolve) => {

    console.log("=====================".green);
    console.log("seleccione una opcion".red);
    console.log("=====================\n".green);

    console.log(`${"1".green}. Crear tareas`);
    console.log(`${"2".green}. Listar tareas`);
    console.log(`${"3".green}. Listar tareas completadas`);
    console.log(`${"4".green}. Listar tareas pendientes`);
    console.log(`${"5".green}. Completar tarea(s)`);
    console.log(`${"6".green}. Borar tarea`);
    console.log(`${"0".green}. salir\n`);

    /**
     * Creating a readline interface.
     * readline es un paquete de node que permite interactuar con el usuario
     * process.stdin: pone en pausa la app en cdm para recibir un valor o enter
     * process.stout: para mostrar algo en consola cuando se le pide algo al usuario
     */
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    /**
     * readline.question: pregunta al usuario
     * @param {string} question: pregunta al usuario
     * @param {function} callback: callback que se ejecuta cuando el usuario responde
     * readline.close: cierra el readline
     * @returns {void} resolve: devuelve un valor ingresado por el suuario
     */
    readline.question("Selecciona una opcion\n", (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

/**
 * Ejecuta una pausa en la consola con la interface de readline
 * @returns A promise.
 */
const pausa = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
    });

    readline.question(`\nPresione ${"ENTER".green} para continuar\n`, (opt) => {
      readline.close();
      resolve(opt); //? resolucion de la promesa ln(42)
    });
  });
};


module.exports = {
  mostrarMenu,
  pausa,
};
