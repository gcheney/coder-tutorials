var mongoose = require('mongoose');


var reviewSchema = mongoose.Schema({
    content: {
        type: String, 
        required: true
    }, 
    createdOn: { 
        type: Date, 
        required: true,
        default: Date.now 
    },
    editedOn: { type: Date },
    author: 
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: { type: String }
    }
});

module.exports = mongoose.model('Review', reviewSchema);