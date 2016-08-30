var marked = require('marked');
var Tutorial = require('../models/tutorial');
var Review = require('../models/review');

// set options for marked
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
    }
});

//GET: /tutorials/:id/reviews/new
module.exports.new = function(req, res) {
    Tutorial.findById(req.tutorial_id, function(err, tutorial) {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong. Error: ' + err.message);
            res.redirect('/tutorials/' + req.tutorial_id);
        } else if (tutorial.author.id.equals(req.user._id)) {
            req.flash('error', 'You are unable to review your own tutorial.');
            res.redirect('/tutorials/' + req.tutorial_id);
        } else {
            res.render('reviews/new', { 
                title: 'New Review',
                tutorial: tutorial
            });
        }
    });
}

//POST: /tutorials/:id/reviews/
module.exports.create = function(req, res) {
    Tutorial.findById(req.tutorial_id)
            .populate('reviews')
            .exec(function(err, tutorial) {
               if (err) {
                    console.log(err);
                    req.flash('error', 'Something went wrong. Error: ' + err.message);
                    res.redirect('/tutorials/' + req.tutorial_id);
               } else if (tutorial.author.id.equals(req.user._id)) {
                    // check if user created this tutorial
                    req.flash('error', 'You are unable to review your own tutorial.');
                    res.redirect('/tutorials/' + req.tutorial_id);
               } else {  
                    // check if user already reviewed tutorial
                    var alreadyReviewed = false;
                    tutorial.reviews.forEach(function(review) {
                        if (review.author.id.equals(req.user._id)) {
                            alreadyReviewed = true;
                        }
                    });
                   
                    if (alreadyReviewed) {
                        req.flash('error', 'You are only able to create one review for a tutorial.');
                        res.redirect('/tutorials/' + req.tutorial_id);
                    } else {
                        var markdown = req.body.markdown;
                        var content = marked(markdown);
                        var newReview = { 
                            markdown: markdown,
                            content: content
                        };

                        Review.create(newReview, function(err, review) {
                            if (err) {
                               console.log(err);
                               req.flash('error', 'Something went wrong. Error: ' + err.message);
                            } else {
                                // add username and id to review
                                review.author.id = req.user._id;
                                review.author.username = req.user.username;
                                console.log('New review added: ' + review);
                                review.save();

                                // save review to tutorial
                                tutorial.reviews.push(review);
                                tutorial.save();
                                console.log('Tutorial updated: ' + tutorial);
                                req.flash('success', 'Your review has been successfully saved.');
                                res.redirect('/tutorials/' + tutorial._id);  
                            }
                        });
                    }
                }
            });
}


// GET: tutorials/:id/reviews/:review_id/edit
module.exports.edit = function(req, res) {
    Tutorial.findById(req.tutorial_id, function(err, tutorial) {
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
module.exports.update = function(req, res) {
    var markdown = req.body.markdown;
    var content = marked(markdown);
    
    var reviewToUpdate = { 
        markdown: markdown,
        content: content,
        editedOn: Date.now()
    };
    
    Review.findByIdAndUpdate(req.params.review_id, reviewToUpdate, function(err, review) {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong. Error: ' + err.message);
            res.redirect('back');
        } else {
            req.flash('success', 'Your review has been successfully edited.');
            res.redirect('/tutorials/' + req.tutorial_id);
        }
    })
}

// DELETE /tutorials/:id/reviews/:review_id
module.exports.delete = function(req, res) {
    Review.findByIdAndRemove(req.params.review_id, function(err) {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong. Error: ' + err.message);
            res.redirect('back');
        } else {
            req.flash('success', 'Your review has been deleted successfully');
            res.redirect('/tutorials/' + req.tutorial_id);
        }
    });
}

