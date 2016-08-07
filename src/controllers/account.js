var passport = require('passport');
var User = require('../models/user');
    
// GET: account/signup
module.exports.signup = function(req, res) {
    res.render('account/signup', { title: 'Sign Up'});
}

// POST: /account/signup
module.exports.doSignup = function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            req.flash('error', err.message);
            return res.redirect('/account/signup');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/account/manage');
        });
    });
}
    
// GET: /account/manage
module.exports.manage = function(req, res) {
    User.findOne({ 'username': req.user.username }, function(err, user) {
        if (err) {
            console.log(err);
            req.flash('error', err.message);
            return res.redirect('/');
        }
        res.render('account/manage', { title: 'My Account', user: user });
    });
}
    
//update account password
// POST: /account/manage/password
module.exports.updatePassword = function(req, res) {
    User.findOne({ 'username': req.user.username }, function(err, user) {
        if (err) {
            console.log(err);
            req.flash('error', err.message);
            return res.redirect('/account/manage');
        }

        var newPass = req.body.newPassword;

        //make sure new passwords match
        if (newPass !== req.body.confirmPassword) {
            req.flash('error', 'Please make sure the new password was entered correctly both times.');
            return res.redirect('/account/manage');
        }

        //update user password
        user.setPassword(newPass, function(err) {
            if (err) {
                console.log(err);
                req.flash('error', err.message);
                return res.redirect('/account/manage');
            } else {
                //save user
                user.save(function(err){
                    if (err) {
                        console.log(err);
                        req.flash('error', err.message);
                        return res.redirect('/account/manage');
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
}

//update account details
// POST: /account/manage/details
module.exports.updateDetails = function(req, res) {
    var details = req.body.details;
    var query = {'username': req.user.username};

    //update user password
    User.update(query, { details: details }, function(err, numAffected) {
        if (err) {
            console.log(err);
            req.flash('error', err.message);
            return res.redirect('/account/manage');
        } else {
            console.log('Updated ' + numAffected.ok + ' documents');
            console.log('User ' + req.user.username + ' updated their details.');
            req.flash('success', 'Details successfully updated');
            res.redirect('/account/manage');
        }
    });     
}

// GET: /account/login
module.exports.login = function(req, res) {
    res.render('account/login', { title: 'Login' });
}

// POST: /account/login
module.exports.doLogin = function(req, res) {
    //user is authenticated
    res.redirect(req.session.returnTo || '/account/manage');
    delete req.session.returnTo;
}


// GET: /account/logout
module.exports.logout = function(req, res) {
    req.logout();
    req.flash('success', 'You have been successfully logged out!');
    res.redirect('/')
}
