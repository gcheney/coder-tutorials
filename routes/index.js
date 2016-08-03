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
router.get('/account/manage', middleware.isAuthenticated, accountController.manage);
router.post('/account/manage/password', middleware.isAuthenticated, accountController.updatePassword);
router.get('/account/login', accountController.login);
router.get('/account/logout', accountController.logout);

// if login fails to authenticate 
var failureResult = { 
    failureRedirect: '/account/login', 
    failureFlash: 'Invalid username or password - please try again.' 
}
router.post('/account/login', passport.authenticate('local', failureResult), 
            accountController.doLogin);


/* USER ROUTES */
router.get('/user/:username', userController.index);


/* TUTORIAL ROUTES */
router.get('/tutorials', tutorialsController.index);  
router.get('/tutorials/search', tutorialsController.search);
router.get('/tutorials/create', middleware.isAuthenticated, tutorialsController.create);
router.post('/tutorials', middleware.isAuthenticated, tutorialsController.doCreate);
router.get('/tutorials/:id', tutorialsController.view);
router.get('/tutorials/:id/edit', middleware.checkTutorialOwnership, tutorialsController.edit);
router.put('/tutorials/:id', middleware.checkTutorialOwnership, tutorialsController.doUpdate);
router.delete('/tutorials/:id', middleware.checkTutorialOwnership, tutorialsController.doDelete);



module.exports = router;
