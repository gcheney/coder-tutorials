var mongoose = require('mongoose');
var Tutorial = require('../models/tutorial');
var User = require('../models/user');

function refreshDB() {
    
    User.remove({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log('Removed current users from database');
        }
    });
    
    Tutorial.remove({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log('Removed current tutorials from database');
        }
    });
}

module.exports = refreshDB;
