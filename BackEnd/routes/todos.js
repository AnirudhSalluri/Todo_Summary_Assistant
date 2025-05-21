const express = require('express');
const router = express.Router();
const {
  getTodos,
  addTodo,
  deleteTodo,
} = require('../controllers/todoController');
const {summarizeTodos} = require('../controllers/summarizeController')

router.get('/todos', getTodos);
router.post('/addTodo', addTodo);
router.delete('/delete/:id', deleteTodo);
router.post('/summarize', summarizeTodos);

module.exports = router;
