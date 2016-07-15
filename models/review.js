var mongoose = require('mongoose');


var reviewSchema = mongoose.Schema({
    content: {type: String, required: true}, 
    createdOn: { type: Date, default: Date.now },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
});

module.exports = mongoose.model('Review', reviewSchema);