var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');

router.get('/:username', usersController.index);

module.exports = router;