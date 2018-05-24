const router = require('express').Router();
const db = require('../db/db_users');
const { validate } = require('jsonschema');

const newTask = text => ({
  id: String(Math.random()
    .toString(16)
    .split('.')[1]),
  text,
  isCompleted: false,
});


// GET /users
router.get('/', (req, res) => {
  const users = db.get('users').value();

  res.json({ status: 'OK', data: users });
});

// GET /user/:id get history by id user
router.get('/:id', (req, res) => {
  const user = db
    .get('db_users')
    .find({ id: req.params.id })
    .value();

  res.json({ status: 'OK', data: user });
});

// POST /history
router.post('/', (req, res, next) => {

  const task = newTask(req.body.text);

  console.log(task);

  db
    .get('tasks')
    .push(task)
    .write();

  res.json({ status: 'OK', data: task });
});

// PATCH /history/:id
router.patch('/:id', (req, res, next) => {

  const task = db
    .get('tasks')
    .find({ id: req.params.id })
    .assign(req.body)
    .value();

  db.write();

  res.json({ status: 'OK', data: task });
});

// DELETE /user/:id
router.delete('/:id', (req, res) => {
  db
    .get('tasks')
    .remove({ id: req.params.id })
    .write();

  res.json({ status: 'OK' });
});

module.exports = router;
