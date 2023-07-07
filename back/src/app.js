require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const figlet = require('figlet');

const apiGateway = require('./apiGateway');


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


// Rutas REST para crear listas y agregar tareas
app.post('/lists', (req, res) => {
  apiGateway.createList(req.body, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al crear la lista' });
    } else {
      res.json(result);
    }
  });
});

app.post('/tasks', (req, res) => {
  apiGateway.createTask(req.body, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al crear la tarea' });
    } else {
      res.json(result);
    }
  });
});

// app.post('/tasks', (req, res) => {
//   apiGateway.addTaskToList(req.body, (err, result) => {
//     if (err) {
//       res.status(500).json({ error: 'Error al agregar la tarea a la lista' });
//     } else {
//       res.json(result);
//     }
//   });
// })

app.get('/lists', (req, res) => {
  apiGateway.getList((err, lists) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener la lista de listas' });
    } else {
      res.json(lists);
    }
  });
});

app.get('/tasks', (req, res) => {
  apiGateway.getTask((err, tasks) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener la lista de tareas' });
    } else {
      res.json(tasks);
    }
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  figlet('  Lemmons : OK', (err, res) => {
    console.log(res);
    console.log(`       Server work in port: ---> ${port}`);
  });
});
