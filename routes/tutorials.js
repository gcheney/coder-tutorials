var express = require('express');
var router = express.Router();
var Tutorial = require('../models/tutorial');
var middleware = require('../middleware');

// LIST
//GET: /tutorials
router.get('/', function(req, res){
    Tutorial.find({}, function(err, tutorials){
        if (err) {
            console.log(err);
        } else {
            res.render('tutorials/index', { 
                title: 'All Tutorials',
                tutorials: tutorials
            });
        }
    });
});

//CREATE
//POST: /tutorials
router.post('/', middleware.isAuthenticated, function(req, res){
    //Get the data from the req
    var title = req.body.title;
    var content = req.body.content;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    //create tutorial object
    var newTutorial = { 
        title: title, 
        content: content, 
        author: author
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


// NEW
//GET: /tutorials/new
router.get('/new', middleware.isAuthenticated, function(req, res){
    res.render('tutorials/new');
});

// view - tutorials and comments
//GET: /tutorials/:id 
router.get('/:id', function(req, res){
    Tutorial.findById(req.params.id)
            .populate('reviews')
            .exec(function(err, tutorial){
                if (err){
                    console.log(err);
                    res.redirect('/');
                } else {
                    res.render('tutorials/view', { tutorial: tutorial });
                }
            });
});

//EDIT tutorial ROUTE
router.get('/:id/edit', middleware.checkTutorialOwnership, function(req, res){
    Tutorial.findById(req.params.id, function(err, tutorial){
        if(err){
            console.log(err);
            res.redirect('back')
        }
        res.render('tutorials/edit', { tutorial: tutorial });
    });
});

// UPDATE tutorial ROUTE
router.put('/:id', middleware.checkTutorialOwnership, function(req, res){
    Tutorial.findByIdAndUpdate(req.params.id, req.body.tutorial, function(err, tutorial){
       if(err) {
           console.log(err);
           res.redirect('/');
       } else {
           req.flash('success', 'Tutorial successfully updated!');
           res.redirect('/tutorials/' + tutorial.id);
       }
    });
});

//DESTROY route
router.delete('/:id', middleware.checkTutorialOwnership, function(req, res){
    Tutorial.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }
        req.flash('success', 'Tutorial successfully deleted!');
        res.redirect('/');
    });
});

module.exports = router;
