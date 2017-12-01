var express = require('express');
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");



router.get('/', function(req, res){
    // GET ALL CAMPGROUNDS FROM DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            req.flash('error', err.message);
            res.redirect('back');
        } else {
            res.render('campgrounds/index', {campgrounds : allCampgrounds});
        }
    });
    
});


// CREATE == ADD NEW CAMPGROUND TO DB
router.post('/', middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {'name' : name, 'image': image, 'description': desc, 'author': author};
    
    // CREATE A NEW CAMPGROUND AND SAVE TO DB
    Campground.create(newCampground, function(err, newCampground){
        if(err){
            req.flash('error', err.message);
            res.redirect('back');
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
    
    
});

// NEW == SHOW FORM TO CREATE NEW CAMPGROUND
router.get('/new', middleware.isLoggedIn, function(req, res) {
   res.render('campgrounds/new'); 
});


// SHOW == SHOWS MORE INFO ABOUT ONE CAMPGROUND
router.get('/:id', function(req, res) {
    // FIND THE CAMPGROUND WITH PROVIDED ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
       if(err || !foundCampground){
           req.flash('error', 'Campground not found');
           res.redirect('back');
       } else {
           // RENDER SHOW TEMPLATE WITH THAT ID
           res.render('campgrounds/show', {campground : foundCampground});
       }
    });
});

// EDIT ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
           req.flash('error', err.message);
           res.redirect('/campgrounds');
       } else {
           // redirect
           res.render('campgrounds/edit', {campground: foundCampground});
       }
    });
});

// UPDATE ROUTE
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, foundCampground){
       if(err){
           req.flash('error', err.message);
           res.redirect('back');
       } else {
           // redirect
           res.redirect('/campgrounds/' + req.params.id);
       }
    });
});


// DESTROY ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    // find and update the correct campground
    Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           req.flash('error', err.message);
           res.redirect('/campgrounds');
       } else {
           req.flash('success', 'Campground deleted');
           // redirect
           res.redirect('/campgrounds/');
       }
    });
});




module.exports = router;