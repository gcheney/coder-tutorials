// ------------------- REQUIRES ------------------------ //
var express         = require('express'),
    app             = express(),
    morgan          = require('morgan'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose')

// ------------------- INITIAL APP SETTINGS ------------------------ //
var PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(morgan('combined'));

// ------------------- REQUIRE ROUTES ------------------------ //
var homeRoutes = require('./routes/home');

// ---------- DATABASE CONFIGURATION ----------- //
//mongodb://<dbuser>:<dbpassword>@ds035014.mongolab.com:35014/db_name
var DB_URL = process.env.DATABASE_URL || 'mongodb://localhost/coder_tutorials';
mongoose.connect(DB_URL);


// ------------------- APP LISTEN ------------------------ //

app.listen(PORT, function(req, res){
    console.log('Server is listening on port ' + PORT); 
    console.log('http://127.0.0.1:' + PORT);
});




