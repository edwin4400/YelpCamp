var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// ==================
// COMMENTS ROUTES
// ==================
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//comments post route
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, dbComment){ //use Comment to create comment object in database with return of dbComment
                if (err) {
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    dbComment.author.username = req.user.username;
                    dbComment.author.id = req.user._id;
                    dbComment.save();
                    campground.comments.push(dbComment); //push dbComment to associate with that specific campground and save with comment object id
                    campground.save();
                    req.flash("success", "Successfully added new comment");
                    res.redirect("/campgrounds/" + req.params.id);
                }                
            })
        }
    });
});

//comment edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){ //use comment_id from url params to search db.comments
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment}); //campground_id no "._id" is retrieve from url params id not from Campground.findById
        }
    })
});

//update comment route
router.put("/:comment_id", function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

//Destroy comment route
router.delete("/:comment_id", function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if (err) {
           res.redirect("back");
       } else {
           req.flash("success", "Comment deleted");
           res.redirect("/campgrounds/" + req.params.id);
       }
   }) 
});

module.exports = router;