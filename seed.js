var mongoose = require('mongoose');
var Tutorial = require('./models/tutorial');
var Review = require('./models/review');
var User = require('./model/User');

var tutorials = [
    {
        title: 'How To Be The Best There Ever Was',
        content: 'Notice that, internally, Tokens uses an array, which implements IEnumerator and IEnumerable itself. The code sample could have leveraged the arrays enumeration methods as its own, but that would have defeated the purpose of this example.',
        createdOn: new Date("October 13, 2014 11:13:00")
    }
];

function seedDB() {
    
    
    Tutorial.remove({}, function(err){
        if(err) {
            console.log(err);
        } 
    });

    User.remove({}, function(err){
        if(err) {
            console.log(err);
        } 
    });
       
    //remove all tutorials in the DB
    Tutorial.remove({}, function(err){
        if(err) {
            console.log(err);
        } else {
            console.log('Removed current tutorials from database.');        
            //Add new tutorial to the DB
            tutorials.forEach(function(tutorialData){
                Tutorial.create(tutorialData, function(err, tutorial){
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
                               username: 'Homer Simpson' 
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
    });
}

module.exports = seedDB;
