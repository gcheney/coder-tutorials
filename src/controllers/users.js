var moment = require('moment');
var Tutorial = require('../models/tutorial');

// GET: /user/username
module.exports.index = function(req, res) {
    //Get all of :username tutorials from the db sorted by desc date
    var username = req.params.username;
    var title = 'Tutorials by ' + username;
    
    User.findOne({ 'username': username }, function(err, user) {
        if (err) {
            console.log(err);
            req.flash('error', err.message);
            return res.redirect('/');
        } else {
            Tutorial.find({ 'author.username': user.username })
                .sort({'createdOn': 'desc'})
                .exec(function(err, tutorials) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render('users/list', { 
                            title: title,
                            user: user,
                            tutorials: tutorials,
                            moment: moment
                        });
                    }
                });  
        }
    });
}