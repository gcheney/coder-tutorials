var Tutorial = require('../models/tutorial');
var Review = require('../models/review');
var middleware = require('../middleware');

module.exports = function(app) {
    
    // NEW REVIEW
    //GET: /tutorials/:id/reviews/new
    app.get('/tutorials/:id/reviews/new', middleware.isAuthenticated, function(req, res){
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
    });

    // CREATE NEW REVIEW
    //POST: /tutorials/:id/reviews/
    app.post('/tutorials/:id/reviews/', middleware.isAuthenticated, function(req, res){
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
    });

    // Review Edit Form
    // GET: tutorials/:id/reviews/:review_id/edit
    app.get('/tutorials/:id/reviews/:review_id/edit', middleware.checkReviewOwnership, function(req, res) {
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
               res.render('reviews/edit', { tutorial: tutorial, review: review});
            });
        });
    });

    // UPDATE Review route
    // POST: tutorials/:id/reviews/:review_id
    app.put('/tutorials/:id/reviews/:review_id', middleware.checkReviewOwnership, function(req, res){
        Review.findByIdAndUpdate(req.params.review_id, req.body.review, function(err, review) {
            if (err){
                console.log(err);
                res.redirect('back');
            } else {
                res.redirect('/tutorials/' + req.params.id);
            }
        })
    });

    // REMOVE REVIEW 
    // DELETE /tutorials/:id/reviews/:review_id
    app.delete('/tutorials/:id/reviews/:review_id', middleware.checkReviewOwnership, function(req, res) {
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
    });
    
}