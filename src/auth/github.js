var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

var User = require('../models/user');
var initUser = require('./init');

// not valid - used to run app without github oAuth errors
var strategy = {
    clientID: '34tggg3334t4333',
    clientSecret: '0c9663c587bfe44d625ce7aef496ca1ff3e58198',
    callbackURL: 'http://127.0.0.1:3000/account/github/auth'
};

if (process.env.NODE_ENV === 'production') {
    strategy = {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    };
}

var githubCallback = function(accessToken, refreshToken, profile, done) {

    var searchQuery = {
        username: profile.displayName
    };

    var updates = { 
        username: profile.displayName 
    };

    var options = {
        upsert: true
    };

    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
        if(err) {
            return done(err);
        } else {
            return done(null, user);
        }
    });
};

passport.use(new GitHubStrategy(strategy, githubCallback));

// serialize user into the session
initUser();

module.exports = passport;