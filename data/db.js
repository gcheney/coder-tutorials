var mongoose = require('mongoose');  

//mongodb://<dbuser>:<dbpassword>@ds035014.mongolab.com:35014/db_name
var DB_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/coder_tutorials';
mongoose.connect(DB_URI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + DB_URI);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});