var mongoose = require('mongoose');
var countAndFind = require('mongoose-count-and-find');

// Database schema setup
var tutorialSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        maxlength: 100 
    },
    description: { 
        type: String, 
        required: true, 
        maxlength: 250 
    },
    content: { 
        type: String, 
        required: true 
    },
    markdown: { 
        type: String, 
        required: true 
    },
    createdOn: { 
        type: Date, 
        default: Date.now,
        required: true
    },
    editedOn: { type: Date },
    isPublished: { 
        type: Boolean, 
        default: false 
    },
    author: {
        id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: { type: String }
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

tutorialSchema.plugin(countAndFind);

module.exports = mongoose.model('Tutorial', tutorialSchema);