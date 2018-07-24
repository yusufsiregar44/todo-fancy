var express = require('express');
const todoController = require('../controllers/todoController');
var router = express.Router();

router.post('/', todoController.create);

router.get('/', todoController.read);

router.put('/:id', todoController.update);

router.delete('/:id', todoController.delete);

module.exports = router;
