var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home');
var accountController = require('../controllers/account');
var userController = require('../controllers/user');
var tutorialsController = require('../controllers/tutorials');
var reviewsController = require('../controllers/reviews');


/* Home Pages */
router.get('/', homeController.index);
router.get('/about', homeController.about);

/* Account Pages */

module.exports = router;
