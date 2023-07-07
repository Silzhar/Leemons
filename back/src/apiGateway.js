const EventEmitter = require('events');
const ListService = require('./listService');
const TaskService = require('./taskService');
const fs = require('fs');

class ApiGateway extends EventEmitter {
  constructor() {
    super();
    this.listService = new ListService();
    this.taskService = new TaskService();

    // Suscribirse a los eventos emitidos por los servicios
    this.listService.on('listCreated', this.handleListCreated.bind(this));
    // this.taskService.on('taskAdded', this.handleTaskAdded.bind(this));
    this.taskService.on('taskCreated', this.handleTaskCreated.bind(this));
  }

  handleListCreated(list) {
    console.log('Nueva lista creada:', list);
  }
   handleTaskCreated(task) {
    console.log('Nueva tarea creada:', task);
  }


  // handleTaskAdded({ listId, taskName }) {
  //   console.log('Nueva tarea agregada a la lista', listId + ':', taskName);
  // }

  createList(listData, callback) {
    const newList = this.listService.createList(listData);
    callback(null, newList);
  }  

  getList(callback) {
    this.listService.getLists((err, lists) => {
      if (err) {
        callback(err);
      } else {
        callback(null, lists);
      }
    });
  }

  getTask(callback) {
    this.taskService.getTask((err, task) => {
      if (err) {
        callback(err);
      } else {
        callback(null, task);
      }
    });
  }

  createTask(taskData, callback) {
    const newTask = this.taskService.createTask(taskData);
    callback(null, newTask);
  }

  addTaskToList(taskData, callback) {
    const result = this.taskService.addTaskToList(taskData);
    callback(null, result);
  }
}

module.exports = new ApiGateway();
