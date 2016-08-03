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


/* USER ROUTES */
router.get('/user/:username', userController.index);

/* TUTORIAL ROUTES */


router.get('/tutorials', tutorialController.index);  
router.get('/tutorials/search', tutorialController.index);
    
    // CREATE
    // GET: /tutorials/create
    app.get('/tutorials/create', middleware.isAuthenticated, function(req, res){
        res.render('tutorials/create', { title: 'Create Tutorial'});
    });

    // CREATE
    // POST: /tutorials
    app.post('/tutorials', middleware.isAuthenticated, function(req, res){
        var title = req.body.title;
        var description = req.body.description;
        var markdown = req.body.content;
        var author = {
            id: req.user._id,
            username: req.user.username
        };

        //parse markdown into html before saving
        var content = marked(markdown);

        //create tutorial object to save
        var newTutorial = { 
            title: title, 
            description: description,
            content: content, 
            author: author,
            markdown : markdown
        };

        //add new tutorial to the database
        Tutorial.create(newTutorial, function(err, tutorial){
            if (err){
                console.log(err);
            } else {
                console.log('Created new tutorial: ' + tutorial);
                res.redirect('/tutorials/' + tutorial._id);
            }
        });
    });

    // VIEW
    //GET: /tutorials/:id 
    app.get('/tutorials/:id', function(req, res){
        Tutorial.findById(req.params.id)
                .populate('reviews')
                .exec(function(err, tutorial){
                    if (err){
                        console.log(err);
                        res.redirect('/');
                    } else {
                        res.render('tutorials/view', { 
                            tutorial: tutorial,
                            moment: moment,
                            title: "View Tutorial"
                        });
                    }
                });
    });

    // EDIT tutorial ROUTE
    // GET: /tutorials/:id/edit
    app.get('/tutorials/:id/edit', middleware.checkTutorialOwnership, function(req, res){
        Tutorial.findById(req.params.id, function(err, tutorial){
            if (err) {
                console.log(err);
                res.redirect('back')
            }
            res.render('tutorials/edit', { 
                tutorial: tutorial,
                title: "Edit Tutorial"
            });
        });
    });

    // UPDATE tutorial ROUTE
    // PUT: /tutorials/:id
    app.put('/tutorials/:id', middleware.checkTutorialOwnership, function(req, res) {
        var title = req.body.tutorial.title;
        var description = req.body.tutorial.description;
        var markdown = req.body.tutorial.content;
        var content = marked(markdown);

        var updatedTutorial = { 
            title: title, 
            description: description,
            content: content, 
            markdown: markdown,
            editedOn: Date.now()
        };

        Tutorial.findByIdAndUpdate(req.params.id, updatedTutorial, function(err, tutorial) {
           if (err) {
               console.log(err);
               res.redirect('/');
           } else {
               req.flash('success', 'Tutorial successfully updated!');
               res.redirect('/tutorials/' + tutorial.id);
           }
        });
    });

    // DESTROY route
    // DELETE: /tutorials/:id
    app.delete('/tutorials/:id', middleware.checkTutorialOwnership, function(req, res){
        Tutorial.findByIdAndRemove(req.params.id, function(err){
            if (err){
                console.log(err);
            }
            req.flash('success', 'Tutorial successfully deleted!');
            res.redirect('/');
        });
    });
module.exports = router;
