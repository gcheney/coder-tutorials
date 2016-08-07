var moment = require('moment');
var Tutorial = require('../models/tutorial');

// GET: /
module.exports.index =  function(req, res) {
        //Get all tutorials from the db sorted by desc date
        Tutorial.find({})
                .sort({'createdOn': 'desc'})
                .limit(5)
                .exec(function(err, tutorials) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render('home/index', { 
                            title: 'Home',
                            tutorials: tutorials,
                            moment: moment
                        });
                    }
                });
}
    
// GET /about
module.exports.about = function(req, res) {
        res.render('home/about', { title: 'About' });
}