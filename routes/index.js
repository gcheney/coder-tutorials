var express = require('express');
var router = express.Router();
var passport = require('passport');
var middleware = require('../middleware');
var homeController = require('../controllers/home');
var accountController = require('../controllers/account');
var userController = require('../controllers/user');
var tutorialsController = require('../controllers/tutorials');
var reviewsController = require('../controllers/reviews');


/* HOME ROUTES */
router.get('/', homeController.index);
router.get('/about', homeController.about);


/* ACCOUNT ROUTES */
router.get('/account/signup', accountController.signup);
router.post('/account/signup', accountController.doSignup);

router.get('/account/manage', middleware.isAuthenticated, 
           accountController.manage);

router.post('/account/manage/password', middleware.isAuthenticated, 
            accountController.updatePassword);

router.get('/account/login', accountController.login);

// if login fails to authenticate 
var failureResult = { 
    failureRedirect: '/account/login', 
    failureFlash: 'Invalid username or password - please try again.' 
}
router.post('/account/login', passport.authenticate('local', failureResult), 
            accountController.doLogin);

router.get('/account/logout', accountController.logout);

module.exports = router;
