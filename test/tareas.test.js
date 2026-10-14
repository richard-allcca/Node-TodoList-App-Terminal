const assert = require("node:assert/strict");
const { describe, it } = require("node:test");
const Tareas = require("../models/tareas");

describe("Tareas", () => {
  it("crea y elimina tareas por identificador", () => {
    const tareas = new Tareas();

    tareas.crearTarea("Preparar entrega");
    const [tarea] = tareas.getListadoArr;

    assert.equal(tarea.desc, "Preparar entrega");
    assert.ok(tarea.id);

    tareas.borrarTarea(tarea.id);
    assert.deepEqual(tareas.getListadoArr, []);
  });

  it("actualiza el estado según los identificadores seleccionados", () => {
    const tareas = new Tareas();
    tareas.cargarTareasDb([
      { id: "una", desc: "Primera", completadoEn: null },
      { id: "dos", desc: "Segunda", completadoEn: null },
    ]);

    tareas.toggleCompletadas(["una"]);

    const listado = tareas.getListadoArr;
    assert.ok(listado.find((tarea) => tarea.id === "una").completadoEn);
    assert.equal(listado.find((tarea) => tarea.id === "dos").completadoEn, null);
  });
});