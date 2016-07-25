var passport = require('passport');
var User = require('../models/user');
var middleware = require('../middleware');

module.exports = function(app) {
    
    // view signup form
    // GET: account/signup
    app.get('/account/signup', function(req, res){
        res.render('account/signup', { title: 'Sign Up'});
    });

    // handle signup login
    // POST: /account/signup
    app.post('/account/signup', function(req, res){
        var newUser = new User({username: req.body.username});
        User.register(newUser, req.body.password, function(err, user){
            if (err) {
                console.log(err);
                req.flash('error', err.message);
                return res.render('account/signup', { title: 'Sign Up' });
            }
            passport.authenticate('local')(req, res, function(){
                res.redirect('/account/manage');
            });
        });
    });
    
    // view manage account form
    // GET: /account/manage
    app.get('/account/manage', middleware.isAuthenticated, function(req, res){
        res.render('account/manage', { title: 'My Account'});
    });
    
    // password update
    // POST: /account/manage
    app.post('/account/manage/password', middleware.isAuthenticated, function(req, res){
        User.findOne({ username: req.user.username }, function(err, user) {
            if (err) {
                console.log(err);
                req.flash('error', err.message);
                return res.render('account/manage', { title: 'My Account'});
            }
            
            var newPass = req.body.newPassword;
            
            //make sure new passwords match
            if (newPass !== req.body.confirmPassword) {
                req.flash('error', 'Please make sure the new password was entered correctly both times.');
                return res.render('account/manage', { title: 'Account'});
            }

            //update user password
            user.setPassword(newPass, function(err) {
                if (err) {
                    console.log(err);
                    req.flash('error', err.message);
                    return res.render('account/manage', { title: 'My Account'});
                } else {
                    //save user
                    user.save(function(err){
                        if (err) {
                            console.log(err);
                            req.flash('error', err.message);
                            return res.render('account/manage', { title: 'My Account'});
                        } else {
                            //success - password changed
                            console.log('User ' + req.user.username + ' updated their password.');
                            req.flash('success', 'Password successfully updated');
                            res.redirect('/account/manage');
                        }
                    });
                }
            });     
        });
    });

    // view login form
    // GET: /account/login
    app.get('/account/login', function(req, res){
        res.render('account/login', { title: 'Login' });
    });

    // login user
    // POST: /account/login
    app.post('/account/login', passport.authenticate('local', { failureRedirect: '/account/login'}), 
        function(req, res) {
            //user is authenticated
            res.redirect(req.session.returnTo || '/account/manage');
            delete req.session.returnTo;
        }
    );

    // logout route
    // GET: /account/logout
    app.get('/account/logout', function(req, res){
        req.logout();
        req.flash('success', 'You have been successfully logged out!');
        res.redirect('/')
    });
    
}