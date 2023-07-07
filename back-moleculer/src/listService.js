const { Service } = require('moleculer');

class ListService extends Service {
  constructor(broker) {
    super(broker);

    this.lists = [];
    this.loadData();
  }

  async created() {
    await this.loadData();
  }

  async createList(ctx) {
    const newList = { id: this.generateId(), name: ctx.params.name };
    this.lists.push(newList);

    // Guardar los datos actualizados en la persistencia
    await this.saveData();

    // Emitir el evento "listCreated" con la lista creada
    await this.broker.emit('listCreated', newList);

    return newList;
  }

  async getLists() {
    return this.lists;
  }

  async loadData() {
    try {
      const { lists } = await this.broker.call('data.read', { path: 'lists.json' });
      this.lists = lists;
    } catch (error) {
      // Si ocurre un error al leer el archivo o el archivo no existe, se asume que no hay datos guardados.
      // En ese caso, se inicializa una lista vacía.
      this.lists = [];
    }
  }

  async saveData() {
    await this.broker.call('data.write', { path: 'lists.json', data: { lists: this.lists } });
  }

  generateId() {
    return Math.random().toString(36).substr(2, 8);
  }
}

module.exports = ListService;
