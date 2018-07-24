var express = require('express');
const authentication = require('../middlewares/authentication');
var router = express.Router();

router.post('/', authentication.decodeToken);

module.exports = router;
