const router = require('express').Router();
const Todo = require('../models/todo');

// Find All
router.get('/', (req, res) => {
  Todo.findAll()
    .then((todos) => {
      if (!todos.length) return res.status(404).send({ err: 'Todo not found' });
      res.send(`find successfully: ${todos}`);
    })
    .catch(err => res.status(500).send(err));
});

// Find One by todoid
router.get('/todoId/:todoId', (req, res) => {
  Todo.findOneByTodoid(req.params.todoId)
    .then((todo) => {
      if (!todo) return res.status(404).send({ err: 'Todo not found' });
      res.send(`findOne successfully: ${todo}`);
    })
    .catch(err => res.status(500).send(err));

    console.log(req.params.todoId);
});

// Create new todo document
router.post('/', (req, res) => {
  console.log('create Todo body');
  Todo.create(req.body)
    .then(todo => res.send(todo))
    .catch(err => res.status(500).send(err));
});

// Update by todoid
router.put('/todoid/:todoId', (req, res) => {
  Todo.updateByTodoid(req.params.todoId, req.body)
    .then(todo => res.send(todo))
    .catch(err => res.status(500).send(err));
});

// Delete by todoid
router.delete('/todoId/:todoId', (req, res) => {
  Todo.deleteByTodoid(req.params.todoId)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
