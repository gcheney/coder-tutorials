var express = require('express');
var router = express.Router();
var passport = require('passport');
var authMiddleware = require('../middleware/auth');
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
router.get('/account/manage', authMiddleware.isAuthenticated, accountController.manage);
router.post('/account/manage/password', authMiddleware.isAuthenticated, accountController.updatePassword);
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
router.get('/tutorials/create', authMiddleware.isAuthenticated, tutorialController.create);
router.post('/tutorials', authMiddleware.isAuthenticated, tutorialController.doCreate);
router.get('/tutorials/:id', tutorialController.view);
router.get('/tutorials/:id/edit', authMiddleware.checkTutorialOwnership, tutorialController.edit);
router.put('/tutorials/:id', authMiddleware.checkTutorialOwnership, tutorialController.doUpdate);
router.delete('/tutorials/:id', authMiddleware.checkTutorialOwnership, tutorialController.doDelete);


/* REVIEW ROUTES */
router.get('/tutorials/:id/reviews/new', authMiddleware.isAuthenticated, reviewController.new);
router.post('/tutorials/:id/reviews/', authMiddleware.isAuthenticated, reviewController.doCreate);
router.get('/tutorials/:id/reviews/:review_id/edit', authMiddleware.checkReviewOwnership, reviewController.edit);
router.put('/tutorials/:id/reviews/:review_id', authMiddleware.checkReviewOwnership, reviewController.doUpdate);
router.delete('/tutorials/:id/reviews/:review_id', authMiddleware.checkReviewOwnership, reviewController.doDelete);



module.exports = router;
