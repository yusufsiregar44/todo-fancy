var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();

/* GET users listing. */
router.post('/registerWithFB', function(req, res) {
  userController.registerWithFB(req, res);
});

router.post('/registerWithForm', function(req, res) {
  userController.registerWithForm(req, res);
});

module.exports = router;
