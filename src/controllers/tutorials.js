var marked = require('marked');
var moment = require('moment');
var Tutorial = require('../models/tutorial');

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


// GET: /tutorials
module.exports.index = function(req, res){
    Tutorial.find({'isPublished': true}) 
            .sort({'createdOn': 'desc'})
            .exec(function(err, tutorials){
                if (err) {
                    console.log(err);
                    req.flash('error', 'Something went wrong. Error: ' + err.message);
                    res.redirect('/');
                } else {
                    res.render('tutorials/list', { 
                        title: 'Tutorials',
                        tutorials: tutorials,
                        message: '',    
                        moment: moment
                    });
                }
            });
}

// GET /tutorials/search?q=query
module.exports.search = function(req, res) {
    var query = req.query.q;
    var regex = new RegExp(query,'i');
    var match = [
        { 'title': regex },              
        { 'content': regex },
        { 'author.username': regex }
    ];

    Tutorial.find({'isPublished': true, '$or': match })
                    .sort({'createdOn': 'desc'})
                    .exec(function(err, tutorials) {
                        if (err) {
                            console.log(err);
                            req.flash('error', 'Something went wrong. Error: ' + err.message);
                            res.redirect('/tutorials');
                        } else {
                            var message = '';
                            var count = tutorials.length;
                            if (count === 0) {
                                message = 'Sorry, no matching tutorials were found.';
                            } else {
                                message = 'We found ' + count + ' matching tutorials';
                            }
                            res.render('tutorials/list', { 
                                title: 'Tutorials',
                                tutorials: tutorials,
                                message: message,
                                moment: moment
                            });
                        }
                    });
}

// GET: /tutorials/create
module.exports.create = function(req, res){
    res.render('tutorials/create', { title: 'Create Tutorial' });
}

// POST: /tutorials
module.exports.doCreate = function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    var markdown = req.body.markdown;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var isPublished = req.body.publish ? true : false;
    var content = marked(markdown); //parse markdown into html before saving

    //create tutorial object to save
    var newTutorial = { 
        title: title, 
        description: description,
        content: content, 
        author: author,
        markdown : markdown,
        isPublished: isPublished
    };

    //add new tutorial to the database
    Tutorial.create(newTutorial, function(err, tutorial) {
        var message = isPublished ? 'New tutorial successfully published' : 'New tutorial successfully saved';
        if (err){
            console.log(err);
            req.flash('error', 'Something went wrong. Error: ' + err.message);
            res.redirect('/tutorials/create');
        } else {
            console.log('Created new tutorial: ' + tutorial);
            req.flash('success', message);
            res.redirect('/tutorials/' + tutorial._id);
        }
    });
}

//GET: /tutorials/:id 
module.exports.view = function(req, res){
    Tutorial.findById(req.params.id)
            .populate('reviews')
            .exec(function(err, tutorial){
                if (err){
                    console.log(err);
                    req.flash('error', 'Something went wrong. Error: ' + err.message);
                    res.redirect('/tutorials]');
                } else {
                    res.render('tutorials/view', { 
                        tutorial: tutorial,
                        moment: moment,
                        title: "View Tutorial"
                    });
                }
            });
}

// GET: /tutorials/:id/edit
module.exports.edit = function(req, res){
    Tutorial.findById(req.params.id, function(err, tutorial){
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong. Error: ' + err.message);
            res.redirect('back')
        }
        res.render('tutorials/edit', { 
            tutorial: tutorial,
            title: "Edit Tutorial"
        });
    });
}

// UPDATE ROUTE
// PUT: /tutorials/:id
module.exports.doUpdate = function(req, res) {
    var title = req.body.title;
    var description = req.body.description;
    var markdown = req.body.markdown;
    var content = marked(markdown);
    
    // check if published state has changed
    var isPublished;
    var message = 'Tutorial successfully updated';
    if (req.body.publish) {
        isPublished = true;
        message = 'Tutorial successfully published';
    } else if (req.body.unpublish) {
        isPublished = false;
        message = 'Tutorial is no longer published';
    } else {
        isPublished = req.body.isPublished;
    }

    var updatedTutorial = { 
        title: title, 
        description: description,
        content: content, 
        markdown: markdown,
        isPublished: isPublished,
        editedOn: Date.now()
    };

    Tutorial.findByIdAndUpdate(req.params.id, updatedTutorial, function(err, tutorial) {
       if (err) {
           console.log(err);
           req.flash('error', 'Something went wrong. Error: ' + err.message);
           res.redirect('/tutorials/edit/' + req.params.id);
       } else {
           console.log('Tutorial updated: ' + tutorial);
           req.flash('success', message);
           res.redirect('/tutorials/' + tutorial.id);
       }
    });
}

// DESTROY ROUTE
// DELETE: /tutorials/:id
module.exports.doDelete = function(req, res){
    Tutorial.findByIdAndRemove(req.params.id, function(err){
        if (err){
            console.log(err);
            req.flash('error', 'Something went wrong. Error: ' + err.message);
            res.redirect('/tutorials/' + req.params.id);
        }
        req.flash('success', 'Tutorial successfully deleted!');
        // redirect to user tutorial overview
        res.redirect('/users/' + req.user.username);
    });
}
