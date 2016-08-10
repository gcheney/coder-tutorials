var Tutorial = require('../models/tutorial');
var Review = require('../models/review');

//GET: /tutorials/:id/reviews/new
module.exports.new = function(req, res) {
    Tutorial.findById(req.params.id, function(err, tutorial) {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong. Error: ' + err.message);
            res.redirect('/tutorials/' + req.params.id);
        } else if (tutorial.author.id.equals(req.user._id)) {
            req.flash('error', 'You are unable to review your own tutorial.');
            res.redirect('/tutorials/' + req.params.id);
        } else {
            res.render('reviews/new', { 
                title: 'New Review',
                tutorial: tutorial
            });
        }
    });
}

//POST: /tutorials/:id/reviews/
module.exports.doCreate = function(req, res) {
    Tutorial.findById(req.params.id, function(err, tutorial) {
       if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong. Error: ' + err.message);
            res.redirect('/tutorials/' + req.params.id);
       } else {
            var newReview = { 
                content: req.body.content
            };
            Review.create(newReview, function(err, review) {
               if (err) {
                   console.log(err);
                   req.flash('error', 'Something went wrong. Error: ' + err.message);
               } else {
                   //add username and id to review
                   review.author.id = req.user._id;
                   review.author.username = req.user.username;
                   console.log('New review added: ' + review);
                   review.save();

                   //save review
                   tutorial.reviews.push(review);
                   tutorial.save();
                   console.log('New tutorial added: ' + tutorial);
                   req.flash('success', 'Your review has been successfully saved.');
                   res.redirect('/tutorials/' + tutorial._id);
               }
            });
        }
    });
}


// GET: tutorials/:id/reviews/:review_id/edit
module.exports.edit = function(req, res) {
    Tutorial.findById(req.params.id, function(err, tutorial) {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong. Error: ' + err.message);
            return res.redirect('back');
        } 
        Review.findById(req.params.review_id, function(err, review) {
           if (err) {
               console.log(err);
               req.flash('error', 'Something went wrong. Error: ' + err.message);
               return res.redirect('back');
           } 
           res.render('reviews/edit', { 
               tutorial: tutorial, 
               review: review,
               title: 'Edit Review'
           });
        });
    });
}

// POST: tutorials/:id/reviews/:review_id
module.exports.doUpdate = function(req, res) {
    var reviewToUpdate = { 
        content: req.body.content,
        editedOn: Date.now()
    };
    Review.findByIdAndUpdate(req.params.review_id, reviewToUpdate, function(err, review) {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong. Error: ' + err.message);
            res.redirect('back');
        } else {
            req.flash('success', 'Your review has been successfully edited.');
            res.redirect('/tutorials/' + req.params.id);
        }
    })
}

// DELETE /tutorials/:id/reviews/:review_id
module.exports.doDelete = function(req, res) {
    Review.findByIdAndRemove(req.params.review_id, function(err) {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong. Error: ' + err.message);
            res.redirect('back');
        } else {
            req.flash('success', 'Your review has been deleted successfully');
            res.redirect('/tutorials/' + req.params.id);
        }
    });
}

