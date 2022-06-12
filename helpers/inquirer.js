const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list", // este tipo le permite elegir opcion
    name: "opcion", // guard el valor de la elección
    message: "¿Que desea hacer?\n",
    choices: [
      {
        value: "1",
        name: `${"1".green}. Crear tarea`,
      },
      {
        value: "2",
        name: `${"2".green}. listar tareas`,
      },
      {
        value: "3",
        name: `${"3".green}. listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4".green}. listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5".green}. Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6".green}. Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0".green}. Salir`,
      },
    ],
  },
];

// ================================================
//? Sistema de control de Menu
// ================================================

/**
 * función de entrada para mostrar opciones de la App
 * @returns id de la opción seleccionada para que ejecute la función
 */
const inquireMenu = async () => {

  console.log("=====================".green);
  console.log("seleccione una opcion".red);
  console.log("=====================\n".green);

  // destructuring option
  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};


/**
 * Funcion de pausa para que la aplicación no se cierre
 * type: "input" permite al usuario escribir
 */
const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"Enter".green} para continuar`,
    },
  ];

  console.log("\n");
  await inquirer.prompt(question);
};

/**
 * @param {string} message mensaje para el usuario similar a confirmar
 * @returns la descripcion de la tarea ingresada por el usuario
 * type: "input" permite al usuario escribir
 * name: "desc" guarda el valor de la descripcion
 * validate: validar que la descripcion no sea vacia
 */
const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

/**
 * @param {[]} tareas lista de tareas
 * @returns {id} id de la tarea seleccionada para borrar
 * type: "list" permite elegir una opcion
 */
const borrarTareaId = async (tareas = []) => {
  // creamos las opciones con las tareas del parametro
  const choices = tareas.map((el, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: el.id,
      name: `${idx} ${el.desc}`,
    };
  });
  // agregando valor '0' para cancelar borrado en lugar de usar 'n'
  choices.unshift({
    value: "0",
    name: "0.".green + " Cancelar",
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "¿Borrar?\n",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(preguntas);
  return id;
};

/**
 * Function para confirmar borrado de tarea
 * @param {string} message mensaje para el usuario
 * @returns ok si se confirma, cancelar si se cancela
 * type: "confirm" permite al usuario confirmar
 */
const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

/**
 * función para listar tareas
 * type: "checkbox" permite elegir varias opciones
 * @param {array} tareas lista de tareas
 * @returns id de la tarea seleccionada para completar
 */
const mostrarlistCheck = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });
  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(pregunta);

  return ids;
};

module.exports = {
  inquireMenu,
  pausa,
  leerInput,
  borrarTareaId,
  confirmar,
  mostrarlistCheck,
};
