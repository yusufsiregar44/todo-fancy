var express = require('express');
const todoController = require('../controllers/todoController');
var router = express.Router();

router.post('/create', todoController.create);

router.put('/update/:id', todoController.update);

router.delete('/delete/:id', todoController.delete);

module.exports = router;
