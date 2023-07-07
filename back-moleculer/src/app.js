require('dotenv').config({ path: './.env' });
const { ServiceBroker } = require('moleculer');
const bodyParser = require('body-parser');
const figlet = require('figlet');

const ListService = require('./listService');
const TaskService = require('./taskService');
const apiGateway = require('./apiGateway');

const broker = new ServiceBroker();

broker.createService(ListService);
broker.createService(TaskService);

broker.start().then(() => {
  const express = require('express');
  const cors = require('cors');

  const app = express();
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cors());

  // const apiGateway = broker.createService({
  //   name: 'api',
  //   actions: {
  //     createList(ctx) {
  //       return ctx.call('list.create', ctx.params).catch(() => {
  //         throw new Error('Error al crear la lista');
  //       });
  //     },
  //     addTaskToList(ctx) {
  //       return ctx.call('task.create', ctx.params).catch(() => {
  //         throw new Error('Error al agregar la tarea a la lista');
  //       });
  //     },
  //     getList(ctx) {
  //       return ctx.call('list.getAll').catch(() => {
  //         throw new Error('Error al obtener la lista de listas');
  //       });
  //     },
  //   },
  // });

  // Rutas REST para crear listas y agregar tareas
  app.post('/lists', (req, res) => {
    apiGateway
      .createList(req.body)
      .then((result) => res.json(result))
      .catch(() => res.status(500).json({ error: 'Error al crear la lista' }));
  });

  app.post('/tasks', (req, res) => {
    apiGateway
      .addTaskToList(req.body)
      .then((result) => res.json(result))
      .catch(() =>
        res.status(500).json({ error: 'Error al agregar la tarea a la lista' })
      );
  });

  app.get('/lists', (req, res) => {
    apiGateway
      .getList()
      .then((lists) => res.json(lists))
      .catch(() =>
        res
          .status(500)
          .json({ error: 'Error al obtener la lista de listas' })
      );
  });

  const port = process.env.PORT || 8080;

  app.listen(port, () => {
    figlet('  Lemmons : OK', (err, res) => {
      console.log(res);
      console.log(`       Server work in port: ---> ${port}`);
    });
  });
});
