const { Service } = require('moleculer');

class TaskService extends Service {
  constructor(broker) {
    super(broker);
    this.tasks = {};
  }

  async addTaskToList(ctx) {
    const { listId, taskName } = ctx.params;

    // Verificar si la lista existe
    if (!this.tasks[listId]) {
      return { error: 'La lista especificada no existe' };
    }

    // Agregar la tarea a la lista correspondiente
    this.tasks[listId].push(taskName);

    // Emitir el evento "taskAdded" con el nombre de la lista y la tarea agregada
    await this.broker.emit('taskAdded', { listId, taskName });

    return { success: true };
  }
}

module.exports = TaskService;
