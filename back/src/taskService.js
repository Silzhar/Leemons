const EventEmitter = require('events');

class TaskService extends EventEmitter {
  constructor() {
    super();
    this.tasks = {};
  }

  addTaskToList(taskData) {
    const { listId, taskName } = taskData;

    // Verificar si la lista existe
    if (!this.tasks[listId]) {
      return { error: 'La lista especificada no existe' };
    }

    // Agregar la tarea a la lista correspondiente
    this.tasks[listId].push(taskName);

    // Emitir el evento "taskAdded" con el nombre de la lista y la tarea agregada
    this.emit('taskAdded', { listId, taskName });

    return { success: true };
  }
}

module.exports = TaskService;
