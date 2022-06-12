const { v4: uuidv4 } = require("uuid");

class Tarea {
  id = "";
  desc = "";
  completadoEn = null;

  constructor(desc) {
    //* el id se crea de manera generica y auto
    this.id = uuidv4();
    this.desc = desc;
    this.completadoEn = null;
  }
}

module.exports = Tarea;
