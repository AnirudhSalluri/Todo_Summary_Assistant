const express = require('express');
const router = express.Router();
const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');
const {summarizeTodos} = require('../controllers/summarizeController')

router.get('/todos', getTodos);
router.post('/addTodo', addTodo);
router.put('/updateTodo/:id', updateTodo);
router.delete('/deleteTodo/:id', deleteTodo);
router.post('/summarize', summarizeTodos);

module.exports = router;
