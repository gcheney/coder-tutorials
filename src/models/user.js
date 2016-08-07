var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        maxlength: 26 
    },
    details: { 
        type: String, 
        maxlength: 1500, 
        default: 'This user has not provided any details yet.' 
    },
    password: { 
        type: String, 
        maxlength: 26, 
        minlength: 6    
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);