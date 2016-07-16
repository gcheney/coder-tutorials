var express         = require('express'),
    app             = express(),
    morgan          = require('morgan')
    bodyParser      = require('body-parser'),
    flash           = require('connect-flash'),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    expressSession  = require('express-session'),
    LocalStrategy   = require('passport-local'),
    methodOverride  = require('method-override'),
    Tutorial        = require('./models/tutorial'),
    Review          = require('./models/review'),
    User            = require('./models/user'),
    seedDB          = require('./seeds')
    
    
// ------------------- INITIAL APP SETTINGS ------------------------ //
var PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(morgan('combined'));
app.use(flash());

// ------------------- REQUIRE ROUTES ------------------------ //
var homeRoutes = require('./routes/home');

// ---------- DATABASE CONFIGURATION ----------- //
//mongodb://<dbuser>:<dbpassword>@ds035014.mongolab.com:35014/db_name
var DB_URL = process.env.DATABASE_URL || 'mongodb://localhost/coder_tutorials';
mongoose.connect(DB_URL);

// ------------------- USE ROUTES ------------------------ //
app.use(homeRoutes);

// ------------------- APP LISTEN ------------------------ //

app.listen(PORT, function(req, res){
    console.log('Server is listening on port ' + PORT); 
    console.log('http://127.0.0.1:' + PORT);
});




