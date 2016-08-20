var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportGithub = require('../auth/github');
var authMiddleware = require('../middleware/auth');
var accountController = require('../controllers/account');


router.get('/signup', accountController.signup);

router.post('/signup', accountController.doSignup);

router.get('/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));

// if github auth fails to authenticate 
var githubFailureResult = { 
    failureRedirect: '/account/login', 
    failureFlash: 'Unable to authenticate via Github - please try again.' 
};
router.get('/github/auth', passportGithub.authenticate('github', githubFailureResult), 
            accountController.doLogin);


router.get('/manage', authMiddleware.isAuthenticated, 
           accountController.manage);


router.post('/manage/password', authMiddleware.isAuthenticated, 
            accountController.updatePassword);


router.post('/manage/details', authMiddleware.isAuthenticated, 
            accountController.updateDetails);


router.get('/login', accountController.login);

// if login fails to authenticate 
var failureResult = { 
    failureRedirect: '/account/login', 
    failureFlash: 'Invalid username or password - please try again.' 
};
router.post('/login', passport.authenticate('local', failureResult), 
            accountController.doLogin);


router.get('/logout', accountController.logout);


module.exports = router;