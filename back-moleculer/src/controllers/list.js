const EventEmitter = require('events');

class CreateLists extends EventEmitter {
  constructor() {
    super();
    this.lists = [];
  }

  createList(name) {
    const list = { name, task: [] };
    this.lists.push(list);
    this.emit('Create', list);
  }

  getLists() {
    return this.lists;
  }
}

module.exports = CreateLists;
