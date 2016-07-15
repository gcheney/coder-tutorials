var mongoose = require('mongoose');

// Database schema setup
var tutorialSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
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

//Database Model setup
module.exports = mongoose.model('Tutorial', tutorialSchema);