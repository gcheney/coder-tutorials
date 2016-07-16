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
var homeRoutes          = require('./routes/home'),
    tutorialRoutes      = require('./routes/tutorials'),
    reviewRoutes        = require('./routes/reviews'),
    accountRoutes       = require('./routes/account')


// ---------- DATABASE CONFIGURATION ----------- //
//mongodb://<dbuser>:<dbpassword>@ds035014.mongolab.com:35014/db_name
var DB_URL = process.env.DATABASE_URL || 'mongodb://localhost/coder_tutorials';
mongoose.connect(DB_URL);
//seedDB();

// ---------- PASSPORT CONFIGURATION ----------- //
app.use(expressSession({
    secret: 'coder tutorials',
    resave: false, 
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//give every view the currentUser varaiable with 
//the value of req.user
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});


// ------------------- USE ROUTES ------------------------ //
app.use('/tutorials', tutorialRoutes);
app.use('/tutorials/:id/reviews', reviewRoutes);
app.use('/account', accountRoutes);
app.use(homeRoutes);


// ------------------- APP LISTEN ------------------------ //
app.listen(PORT, function(req, res){
    console.log('Server is listening on port ' + PORT); 
    console.log('http://127.0.0.1:' + PORT);
});




