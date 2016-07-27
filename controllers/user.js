var moment = require('moment');
var middleware = require('../middleware');
var Tutorial = require('../models/tutorial');

module.exports = function(app) {
    
    // GET: /user/username
    app.get('/user/:username', middleware.isAuthenticated, function(req, res){
        //Get all of :username tutorials from the db sorted by desc date
        var username = req.params.username;
        var title = 'Tutorials by ' + username;
        Tutorial.find({ 'author.username': username })
                .sort({'createdOn': 'desc'})
                .exec(function(err, tutorials) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render('user/list', { 
                            title: title,
                            username: username,
                            tutorials: tutorials,
                            moment: moment
                        });
                    }
                });
    });
    
}