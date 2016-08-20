var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local');
var initUser = require('./init');

module.exports = function() {
    passport.use(new LocalStrategy(User.authenticate()));
    initUser();
};