var express             = require('express'),
    app                 = express(),
    morgan              = require('morgan')
    bodyParser          = require('body-parser'),
    flash               = require('connect-flash'),
    mongoose            = require('mongoose'),
    passport            = require('passport'),
    expressSession      = require('express-session'),
    cookieParser        = require('cookie-parser')
    LocalStrategy       = require('passport-local'),
    methodOverride      = require('method-override'),
    User                = require('./models/user'),
    homeController      = require('./controllers/home'),
    accountController   = require('./controllers/account'),
    reviewController    = require('./controllers/reviews'),
    tutorialController  = require('./controllers/tutorials'),
    userController      = require('./controllers/user')
    
    
// ------------------- INITIAL APP SETTINGS ------------------------ //
var PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(morgan('combined'));
app.use(flash());


// ---------- DATABASE CONFIGURATION ----------- //
require('./data/db');


// ---------- PASSPORT CONFIGURATION ----------- //
app.use(cookieParser());
app.use(expressSession({
    secret: 'topsecret',
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


// ------------------- SETUP CONTROLLERS ------------------------ //
homeController(app);
accountController(app);
tutorialController(app);
reviewController(app);
userController(app);


// ------------------- 404 HANDLER ------------------------ //
app.use(function(req, res, next){
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.render('404', { url: req.url });
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});


// ------------------- APP LISTEN ------------------------ //
app.listen(PORT, function(req, res){
    console.log('Server is listening on port ' + PORT); 
    console.log('http://127.0.0.1:' + PORT);
});




