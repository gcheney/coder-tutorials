var express             = require('express'),
    app                 = express(),
    morgan              = require('morgan')
    bodyParser          = require('body-parser'),
    flash               = require('connect-flash'),
    mongoose            = require('mongoose'),
    passport            = require('passport'),
    expressSession      = require('express-session'),
    cookieParser        = require('cookie-parser'),
    methodOverride      = require('method-override'),
    localAuth           = require('./src/auth/local'),
    homeRoutes          = require('./src/routes'),
    accountRoutes       = require('./src/routes/account'),
    tutorialRoutes      = require('./src/routes/tutorials'),
    reviewRoutes        = require('./src/routes/reviews')
    userRoutes          = require('./src/routes/users')    
    
// ------------------- INITIAL APP SETTINGS ------------------------ //
var PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(morgan('combined'));
app.use(flash());


// ---------- DATABASE CONFIGURATION ----------- //
require('./src/data/db');


// ---------- SESSION CONFIGURATION ----------- //
var secret = 'topsecret';
if (process.env.NODE_ENV === 'production') {
    secret = process.env.SESSION_SECRET;
}

app.use(expressSession({
    secret: 'topsecret',
    resave: false, 
    saveUninitialized : false
}));

// ---------- PASSPORT AUTH CONFIGURATION ----------- //
app.use(passport.initialize());
app.use(passport.session());
localAuth();

// setup local variables for views
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});


// ------------------- SETUP ROUTES ------------------------ //
app.use('/', homeRoutes);
app.use('/users', userRoutes);
app.use('/account', accountRoutes);
app.use('/tutorials', tutorialRoutes);
app.use('/tutorials/:tutorial_id/reviews', function(req,res,next) {
    // middleware to make tutorial_id param available in review routes
    req.tutorial_id = req.params.tutorial_id;
    next();
}, reviewRoutes);


// ------------------- 404 HANDLER ------------------------ //
app.use(function(req, res, next){
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.render('404', { title: '404 Error', url: req.url });
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
    if (process.env.NODE_ENV === 'development') {
        console.log('http://127.0.0.1:' + PORT);
    }
});




