var express = require('express');
var router = express.Router({mergeParams : true}); // merges params from campgrounds and comment
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");


router.get('/new', middleware.isLoggedIn, function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           req.flash('error', err.message);
           res.redirect('back');
       } else {
           res.render('comments/new', {campground: campground});
       }
    });
});

router.post('/', middleware.isLoggedIn, function(req, res){
    // lookup campground using id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash('error', err.message);
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash('error', err.message);
                    res.redirect('/campgrounds');
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// COMMENTS EDIT ROUTE
router.get('/:comment_id/edit', middleware.checkCommentsOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, founcCampground){ // make sure the campground ID is still valid
        if(err || !founcCampground) { // if not null
            req.flash('error', 'Campground not found');
            return res.redirect('back');
        }
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err){
                req.flash('error', err.message);
                res.redirect('back');
            } else {
                res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
            }
        });
    });
});

// COMMENTS UPDATE ROUTE
router.put('/:comment_id', middleware.checkCommentsOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err){
            req.flash('error', err.message);
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// COMMENTS DESTROY ROUTE
router.delete('/:comment_id', middleware.checkCommentsOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           req.flash('error', err.message);
           res.redirect('back');
       } else {
           req.flash('success', 'Comment deleted');
           res.redirect('/campgrounds/' + req.params.id);
       }
       
   }); 
});



module.exports = router;