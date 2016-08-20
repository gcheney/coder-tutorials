var moment = require('moment');
var User = require('../models/user');
var Tutorial = require('../models/tutorial');

// GET: /user/username
module.exports.index = function(req, res) {
    //Get all of :username tutorials from the db sorted by desc date and query
    var username = req.params.username;
    var title = 'Tutorials by ' + username;
    const pageSize = 5;
    
    User.findOne({ 'username': username }, function(err, user) {
        if (err) {
            console.log(err);
            req.flash('error', err.message);
            return res.redirect('/');
        } else {
            var query = {};
            
            if (req.user && req.user.username === username) {
                query = { 'author.username': user.username };
            } else {
                query = { 
                    'author.username': user.username,
                    'isPublished': true 
                };
            }
            
            //pagination
            var page = req.query.page || 1;
            var queryString = req.query.q;
            if (queryString) {
                var regex = new RegExp(queryString, 'i');
                var match = [
                    { 'title': regex },              
                    { 'content': regex }
                ];
                query['$or'] = match;
            }

            Tutorial.countAndFind(query)
                    .sort({'createdOn': 'desc'})
                    .skip((page - 1) * pageSize)
                    .limit(pageSize)
                    .exec(function(err, tutorials, tutorialCount) {
                        if (err) {
                            console.log(err);
                            req.flash('error', 'Something went wrong. Error: ' + err.message);
                            res.redirect('/tutorials');
                        } else {
                            
                            var message = '';
                            if (queryString && tutorialCount === 0) {
                                message = 'Sorry, no matching tutorials were found.';
                            } else if (queryString && tutorialCount !== 0) {
                                message = 'We found ' + tutorialCount + ' matching tutorials';
                            } else if (tutorialCount === 0) {
                                message = 'There are no tutorials here...yet.';
                            }
                            
                            var totalPages = Math.ceil(tutorialCount / pageSize);
                            var url = req.baseUrl + req.path;
                            var pagination = {
                                'currentPage': page,
                                'totalPages': totalPages,
                                'url': url,
                                'q': queryString
                            };

                            res.render('users/list', { 
                                title: title,
                                tutorials: tutorials,
                                user: user,
                                message: message,
                                moment: moment,
                                pagination: pagination
                            });
                        }
                    }); 
        }   
    });
}