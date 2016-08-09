var mongoose = require('mongoose');
var Tutorial = require('../models/tutorial');
var User = require('../models/user');

var users = [
    {
        username: 'george1',
        password: 'Pa$$word'
    },
    {
        username: 'Johnny',
        password: 'BGoode'
    },
    {
        username: 'jackie',
        password: 'chanadventures'
    }
]

var tutorials = [
    {
        title: 'How To Be The Best There Ever Was',
        description: 'A short introduction to time complexity',
        markdown : 'Notice that, internally, Tokens uses an array, which implements IEnumerator and IEnumerable itself. The code sample could have leveraged the arrays enumeration methods as its own, but that would have defeated the purpose of this example.',
        content: 'Notice that, internally, Tokens uses an array, which implements IEnumerator and IEnumerable itself. The code sample could have leveraged the arrays enumeration methods as its own, but that would have defeated the purpose of this example.',
        createdOn: new Date("October 13, 2014 11:13:00")
    }
];

function seedDB() {

    users.forEach(function(user) {
        var newUser = new User({username: user.username});
        User.register(newUser, user.password, function(err, user) {
            if (err) {
                console.log(err);
            } else {
                console.log('Added new user: ' + user);
            }
        });
    });
            

    tutorials.forEach(function(tutorialData) {
        Tutorial.create(tutorialData, function(err, tutorial) {
            if (err) {
                console.log(err);
            } else {
                console.log('Added a new tutorial to the database:');
                console.log(tutorial);                       
                //Create a default comment for the new tutorial
                Review.create({
                    content: 'This was a good tutorial.',
                    createdOn: Date.now(),
                    author: {
                       username: 'Johnny' 
                    }
                }, function(err, review) {
                    if (err) {
                        console.log(err);
                    } else {
                        tutorial.reviews.push(review);
                        tutorial.save();
                        console.log('Added a new review to the tutorial: ');
                        console.log(review);
                    }
                });
            }
        });
    });
}

module.exports = seedDB;
