require("colors");

const {
  inquireMenu,
  pausa,
  leerInput,
  borrarTareaId,
  confirmar,
  mostrarlistCheck,
} = require("./helpers/inquirer");

const { guardarDb, leerDb } = require("./helpers/saveFile");

const Tareas = require("./models/tareas");

console.clear();

/**
 * Main() is an async function that calls other async functions, and awaits their results
 */
const main = async () => {
  let opt = "";

  const tareas = new Tareas();

  //  verifica tareas en db 
  const tareasDb = leerDb();

  if (tareasDb) tareas.cargarTareasDb(tareasDb)

  do {

    opt = await inquireMenu();
    console.log({ opt }); //opcioón seleccionada

    switch (opt) {
      case "1":
        const desc = await leerInput("descripción:");
        tareas.crearTarea(desc);
        break;
      case "2":
        // console.log(tareas.listadoArr);
        // console.log(leerDb());
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.estadoTareas();
        break;
      case "4":
        tareas.estadoTareas(false);
        break;
      case "5":
        const ids = await mostrarlistCheck(tareas.getListadoArr);
        // console.log(ids);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        const id = await borrarTareaId(tareas.getListadoArr);
        if (id !== "0") {
          const ok = await confirmar("Estas seguro de eliminar");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }
        break;

      default:
        break;
    }

    guardarDb(tareas.getListadoArr); //puede ir dentro de switch case"1"
    await pausa();
  } while (opt !== "0");
};

main();
