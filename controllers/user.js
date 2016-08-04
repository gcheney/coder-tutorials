var moment = require('moment');
var Tutorial = require('../models/tutorial');

// LIST USERS TUTORIALS AND INFO
// GET: /user/username
module.exports.index = function(req, res) {
    
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
}