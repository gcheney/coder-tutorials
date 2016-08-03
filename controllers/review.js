var Tutorial = require('../models/tutorial');
var Review = require('../models/review');

//GET: /tutorials/:id/reviews/new
module.exports.new = function(req, res){
    Tutorial.findById(req.params.id, function(err, tutorial){
        if(err){
            console.log(err)
        } else {
            res.render('reviews/new', { 
                title: 'New Review',
                tutorial: tutorial
            });
        }
    });
}

//POST: /tutorials/:id/reviews/
module.exports.doCreate = function(req, res){
    Tutorial.findById(req.params.id, function(err, tutorial){
       if (err){
           req.flash('error', 'Something went wrong. We will look into it.');
           console.log(err);
           res.redirect('/');
       } else {
           console.log(req.body.review); //log new review
           Review.create(req.body.review, function(err, review){
               if (err) {
                   console.log(err);
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
                   res.redirect('/tutorials/' + tutorial._id);
               }
           });
       }
    });
}


// GET: tutorials/:id/reviews/:review_id/edit
module.exports.edit = function(req, res) {
    Tutorial.findById(req.params.id, function(err, tutorial){
        if (err){
            console.log(err);
            return res.redirect('back');
        } 
        Review.findById(req.params.review_id, function(err, review){
           if (err) {
               console.log(err);
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
module.exports.doUpdate = function(req, res){
    var reviewToUpdate = req.body.review;
    reviewToUpdate.editedOn = Date.now();
    Review.findByIdAndUpdate(req.params.review_id, reviewToUpdate, function(err, review) {
        if (err){
            console.log(err);
            res.redirect('back');
        } else {
            res.redirect('/tutorials/' + req.params.id);
        }
    })
}

// DELETE /tutorials/:id/reviews/:review_id
module.exports.doDelete = function(req, res) {
    Review.findByIdAndRemove(req.params.review_id, function(err){
        if (err){
            req.flash('error', 'Something went wrong. We will look into it.');
            console.log(err);
            res.redirect('back');
        } else {
            req.flash('success', 'Review successfully deleted');
            res.redirect('/tutorials/' + req.params.id);
        }
    });
}

