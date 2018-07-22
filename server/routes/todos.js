var express = require('express');
const todoController = require('../controllers/todoController');
var router = express.Router();

router.post('/createTodo', todoController.createTodo);

module.exports = router;
