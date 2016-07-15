var Tutorial = require('../models/tutorial');
var Review = require('../models/review');

//exporting an anonymous object
module.exports = {
    checkTutorialOwnership: function(req, res, next){
        // is user logged in?
        if (req.isAuthenticated()){
            Tutorial.findById(req.params.id, function(err, tutorial){
                if (err){
                    console.log(err);
                    res.redirect('back');
                } else {
                    //does user own tutorial? 
                    if (tutorial.author.id.equals(req.user._id)){
                        next();
                    } else {
                        req.flash('error', 'You do not have sufficent privelages to access this page.');
                        res.redirect('back');
                    }
                }
            });
        } else {
            req.flash('error', 'You need to be logged in to do that.');
            res.redirect('back');
        }
    },
    isAuthenticated: function(req, res, next){
        if (req.isAuthenticated()){
            return next();
        }
        req.flash('error', 'You need to be logged in to do that.');
        res.redirect('/account/login');
    },
    checkReviewOwnership: function(req, res, next){
        if (req.isAuthenticated()){
            Review.findById(req.params.review_id, function(err, review){
                if (err){
                    console.log(err);
                    res.redirect('back');
                } else {
                    if (review.author.id.equals(req.user._id)){
                        next();
                    } else {
                        req.flash('error', 'You do not have sufficent privelages to access this page.');
                        res.redirect('back');
                    }
                }
            });
        } else {
            req.flash('error', 'You need to be logged in to do that.');
            res.redirect('back');
        }
    }
}