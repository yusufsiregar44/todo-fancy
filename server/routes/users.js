var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();

router.post('/registerWithForm', userController.registerWithForm);

router.post('/loginWithFB', userController.loginWithFB);

router.post('/login', userController.login);

module.exports = router;
