var Campground = require("../models/campground");
var Comment = require("../models/comment");

// middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err || !foundCampground){
              req.flash('error', 'Campground not found');
              res.redirect('back');
           } else {
               // does user own campground
               if(foundCampground.author.id.equals(req.user._id)){ // req.user._id is from passport
                   next();
               } else{
                   req.flash('error', 'You cannot edit that campground');
                   res.redirect('back');
               }
           }
        });
    } else {
        req.flash('error', 'Login required');
        res.redirect('back');
    }
};

middlewareObj.checkCommentsOwnership = function (req, res, next){
    // is logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err || !foundComment){
              req.flash('error', 'Comment not found');
              res.redirect('back');
           } else {
               // does user own comment
               if(foundComment.author.id.equals(req.user._id)){ // req.user._id is from passport
                   next();
               } else{
                   req.flash('error', 'You cannot edit that comment');
                   res.redirect('back');
               }
           }
        });
    } else {
        req.flash('error', 'Login required');
        res.redirect('back');
    }
};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'Login required'); // updating with a flash message, will appear on the next page loaded
    res.redirect('/login');
};


module.exports = middlewareObj;