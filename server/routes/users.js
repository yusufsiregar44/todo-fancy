var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();

/* GET users listing. */
router.post('/registerWithFB', userController.registerWithFB);

router.post('/registerWithForm', userController.registerWithForm);

module.exports = router;
