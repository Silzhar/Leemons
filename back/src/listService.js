const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

class ListService extends EventEmitter {
  constructor() {
    super();
    this.lists = [];
    this.loadData();
  }

  createList(listData) {
    const newList = { id: generateId(), name: listData.name };
    this.lists.push(newList);

    // Guardar los datos actualizados en el archivo
    this.saveData();

    // Emitir el evento "listCreated" con la lista creada
    this.emit('listCreated', newList);

    return newList;
  }


  loadData() {
    try {
      const data = fs.readFileSync(path.join(__dirname, 'lists.json'), 'utf8');
      this.lists = JSON.parse(data);
    } catch (error) {
      // Si ocurre un error al leer el archivo o el archivo no existe, se asume que no hay datos guardados.
      // En ese caso, se inicializa una lista vacía.
      this.lists = [];
    }
  }

  getLists(callback) {
    const lists = this.lists;
    callback(null, lists);
  }

  saveData() {
    const data = JSON.stringify(this.lists, null, 2);
    fs.writeFileSync(path.join(__dirname, 'lists.json'), data, 'utf8');
  }
}

// Función auxiliar para generar un ID único
function generateId() {
  return Math.random().toString(36).substr(2, 8);
}

module.exports = ListService;
