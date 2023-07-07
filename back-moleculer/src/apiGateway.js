const { Service, ServiceBroker } = require('moleculer');
const ListService = require('./listService').Service;
const TaskService = require('./taskService');

const broker = new ServiceBroker();

// Registra los servicios en el broker
broker.createService(ListService);
broker.createService(TaskService);

class ApiGateway extends Service {
  constructor(broker) {
    super(broker);
    this.listService = new ListService(this.broker);
    this.taskService = new TaskService(this.broker);

    // Suscribirse a los eventos emitidos por los servicios
    this.listService.on('listCreated', this.handleListCreated.bind(this));
    this.taskService.on('taskAdded', this.handleTaskAdded.bind(this));
  }

  async handleListCreated(list) {
    console.log('Nueva lista creada:', list);
  }

  async handleTaskAdded({ listId, taskName }) {
    console.log('Nueva tarea agregada a la lista', listId + ':', taskName);
  }

  async createList(ctx) {
    const newList = await this.listService.createList(ctx.params);
    return newList;
  }

  async getList() {
    const lists = await this.listService.getLists();
    return lists;
  }

  async addTaskToList(ctx) {
    const result = await this.taskService.addTaskToList(ctx.params);
    return result;
  }
}

module.exports = new ApiGateway(broker);
