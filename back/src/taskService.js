const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');


class TaskService extends EventEmitter {
  constructor() {
    super();
    this.task = [];
    this.loadData();
  }

  createTask(taskData) {
    const newTask = { id: generateId(), name: taskData.name };
    this.task.push(newTask);

    // Guardar los datos actualizados en el archivo
    this.saveData();

    // Emitir el evento "listCreated" con la lista creada
    this.emit('task Created', newTask);

    return newTask;
  }


  loadData() {
    try {
      const data = fs.readFileSync(path.join(__dirname, 'task.json'), 'utf8');
      this.task = JSON.parse(data);
    } catch (error) {
      // Si ocurre un error al leer el archivo o el archivo no existe, se asume que no hay datos guardados.
      // En ese caso, se inicializa una lista vacía.
      this.task = [];
    }
  }

  getTask(callback) {
    const tasks = this.task;
    callback(null, tasks);
  }

  saveData() {
    const data = JSON.stringify(this.task, null, 2);
    fs.writeFileSync(path.join(__dirname, 'task.json'), data, 'utf8');
  }
}

// Función auxiliar para generar un ID único
function generateId() {
  return Math.random().toString(36).substr(2, 8);
}

module.exports = TaskService;
