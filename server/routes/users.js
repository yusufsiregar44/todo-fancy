var express = require('express');
const usersController = require('../controllers/users');
var router = express.Router();

/* GET users listing. */
router.post('/register', function(req, res) {
  usersController.register(req, res);
});

module.exports = router;
