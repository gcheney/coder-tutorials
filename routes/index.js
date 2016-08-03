var express = require('express');
var router = express.Router();
var passport = require('passport');
var middleware = require('../middleware');
var homeController = require('../controllers/home');
var accountController = require('../controllers/account');
var userController = require('../controllers/user');
var tutorialController = require('../controllers/tutorial');
var reviewController = require('../controllers/review');


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
router.get('/tutorials', tutorialController.index);  
router.get('/tutorials/search', tutorialController.search);
router.get('/tutorials/create', middleware.isAuthenticated, tutorialController.create);
router.post('/tutorials', middleware.isAuthenticated, tutorialController.doCreate);
router.get('/tutorials/:id', tutorialController.view);
router.get('/tutorials/:id/edit', middleware.checkTutorialOwnership, tutorialController.edit);
router.put('/tutorials/:id', middleware.checkTutorialOwnership, tutorialController.doUpdate);
router.delete('/tutorials/:id', middleware.checkTutorialOwnership, tutorialController.doDelete);


/* REVIEW ROUTES */
router.get('/tutorials/:id/reviews/new', middleware.isAuthenticated, reviewController.new);
router.post('/tutorials/:id/reviews/', middleware.isAuthenticated, reviewController.doCreate);
router.get('/tutorials/:id/reviews/:review_id/edit', middleware.checkReviewOwnership, reviewController.edit);
router.put('/tutorials/:id/reviews/:review_id', middleware.checkReviewOwnership, reviewController.doUpdate);
router.delete('/tutorials/:id/reviews/:review_id', middleware.checkReviewOwnership, reviewController.doDelete);



module.exports = router;
