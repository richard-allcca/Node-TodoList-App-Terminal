const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { after, before, describe, it } = require("node:test");
const { guardarDb, leerDb } = require("../helpers/saveFile");

describe("persistencia de tareas", () => {
  let directorioTemporal;
  let archivoTemporal;

  before(() => {
    directorioTemporal = fs.mkdtempSync(path.join(os.tmpdir(), "todo-list-test-"));
    archivoTemporal = path.join(directorioTemporal, "data.json");
  });

  after(() => {
    fs.rmSync(directorioTemporal, { recursive: true, force: true });
  });

  it("devuelve null cuando el archivo aún no existe", () => {
    assert.equal(leerDb(archivoTemporal), null);
  });

  it("guarda y carga una lista de tareas", () => {
    const tareas = [{ id: "abc", desc: "Probar", completadoEn: null }];

    guardarDb(tareas, archivoTemporal);

    assert.deepEqual(leerDb(archivoTemporal), tareas);
  });

  it("rechaza JSON inválido y contenido que no sea una lista", () => {
    fs.writeFileSync(archivoTemporal, "{");
    assert.throws(() => leerDb(archivoTemporal), /JSON inválido/);

    fs.writeFileSync(archivoTemporal, "{}");
    assert.throws(() => leerDb(archivoTemporal), /lista de tareas/);
  });
});