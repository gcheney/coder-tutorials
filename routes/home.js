var express = require('express');
var router = express.Router();
var Tutorial = require('../models/tutorial');

// GET: /
router.get('/', function(req, res){
    //Get all tutorials from the db
    Tutorial.find({}, function(err, tutorials){
        if (err) {
            console.log(err);
        } else {
            res.render('home/index', { 
                title: 'Home',
                tutorials: tutorials
            });
        }
    });
});

module.exports = router;