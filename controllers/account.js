var passport = require('passport');
var User = require('../models/user');

module.exports = function(app) {
    
    //view signup form
    app.get('/signup', function(req, res){
        res.render('account/signup');
    });

    //handle signup login
    app.post('/signup', function(req, res){
        var newUser = new User({username: req.body.username});
        User.register(newUser, req.body.password, function(err, user){
            if(err){
                console.log(err);
                req.flash('error', err.message);
                return res.render('account/signup');
            }
            passport.authenticate('local')(req, res, function(){
                res.redirect('/');
            });
        });
    });

    //view login form
    app.get('/login', function(req, res){
        res.render('account/login');
    });

    //login user
    app.post('/login', passport.authenticate('local', { 
            successRedirect: '/',
            failureRedirect: 'account/login'
        }), function(req, res){ 
    });

    //logout route
    app.get('/logout', function(req, res){
        req.logout();
        req.flash('success', 'You have been successfully logged out!');
        res.redirect('/')
    });

    //Login middleware
    function isAuthenticated(req, res, next){
        if (req.isAuthenticated()){
            return next();
        }
        res.redirect('/account/login');
    }
    
}