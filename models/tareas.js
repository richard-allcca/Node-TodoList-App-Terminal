/**
 ** modelo para manejar las tareas y su busqueda en la base de datos 
 * usaremos una lista de objetos Tarea y con la notación del punto 
 * para buscar en la lista mediante el id
 * -listado:
 *    { 'uuid-1234567-1234567-2: { id:12, desc:asd,completadoEn:9231 } }
 *    { 'uuid-1234567-1234567-2: { id:12, desc:asd,completadoEn:9231 } }
 *    { 'uuid-1234567-1234567-2: { id:12, desc:asd,completadoEn:9231 } }
 */


require("colors");
const Tarea = require("./tarea");


/**
 * @class Tareas
 * It's a class that creates a list of tasks, and allows you to add, delete, and mark + tasks as completed
 */
class Tareas {

  _listado = {};

  constructor() {
    this._listado = {};
  }

  /**
   * It takes an array of objects and adds each object to the _listado object.
   * @param [tarea] - [{id: 1, nombre: "tarea 1", completado: false}, {id: 2, nombre: "tarea 2",
   * completado: false}]
   */
  cargarTareasDb(tarea = []) {
    tarea.forEach((el) => (this._listado[el.id] = el));
  }

  /**
   * It takes the object and returns an array of the object's values.
   * @returns An array of objects.
   */
  get getListadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  /**
   * Iterate over the array of tasks and display the tasks that are completed or not completed.
   * @param [completada=true] - true
   */
  estadoTareas(completada = true) {
    let contador = 0;

    this.getListadoArr.forEach((tarea, i) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completado".cyan : "Pendiente".red;

      if (completada) {
        // itera y muestra las "completadasEn" del getListadoArr q sean true
        if (completadoEn) {
          contador += 1;
          console.log(
            `${contador.toString().green}. ${desc} :: ${new Date(
              completadoEn
            ).toLocaleDateString()}`
          );
        }
      } else {
        // itera y muestra las "completadasEn" del getListadoArr q sean false
        if (!completadoEn) {
          contador += 1;
          console.log(`${contador.toString().green}. ${desc}::${estado}`);
        }
      }
    });
  }

  /**
   * * Crear
   * The function crearTarea() creates a new task and adds it to the list of tasks.
   * @param [desc] - The description of the task.
   */
  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  /**
   * * Leer 
   * It takes the array of tasks, iterates over it, and prints out the task description and status.
   */
  listadoCompleto() {
    console.log();
    this.getListadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completado".cyan : "Pendiente".red;
      console.log(`${idx}. ${desc}::${estado}`);
    });
  }

  /**
   * * Actualizar
   * The function takes an array of ids and toggles the completion status of the tasks with those ids.
   * @param [ids] - [1, 2, 3]
   */
  toggleCompletadas(ids = []) {

    // recorrido y cambio de estado a "completado"
    ids.forEach((id) => {

      const tarea = this._listado[id];

      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    // recorrido y cambio de estado a "null"
    this.getListadoArr.forEach((tarea) => {

      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }

  /**
   * * Eliminar
   * If the id exists in the list, delete it.
   * @param [id] - The id of the task to be deleted.
   */
  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }
}

module.exports = Tareas;
