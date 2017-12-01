'use strict';

var       express = require("express"),
              app = express(),
       bodyParser = require("body-parser"),
         mongoose = require('mongoose'),
            flash = require("connect-flash"),
         passport = require("passport"),
    LocalStrategy = require("passport-local"),
   methodOverride = require("method-override"),
       Campground = require("./models/campground"),
          Comment = require('./models/comment'),
             User = require('./models/user'),
           seedDB = require("./seeds");

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

mongoose.connect('mongodb://localhost/yelp_camp', {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));// tells express to use body parser
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
// seedDB(); // seed the database


// PASSPORT CONFIGURATION
app.use(require('express-session')({ // creating the key for encription
    secret: 'this is the secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.use is from express
// this app.use function will be called on every route
app.use(function(req, res, next){ 
    // user data will be injected in every route
    res.locals.currentUser = req.user; // req.user is automatic from passport, for logged in users
    res.locals.error = req.flash('error'); // loads flash messages into every page
    res.locals.success = req.flash('success');
    next();
});

// requiring routes
app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);




app.listen(process.env.PORT, process.env.IP, function(){
   console.log('The YelpCamp server has started.');
});