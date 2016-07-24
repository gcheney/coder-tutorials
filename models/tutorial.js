var mongoose = require('mongoose');

// Database schema setup
var tutorialSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    markdown: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
    editedOn: { type: Date },
    author: {
        id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

module.exports = mongoose.model('Tutorial', tutorialSchema);