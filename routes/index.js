var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


//landing route    
router.get("/", function(req, res){
    res.render("landing");
    });


// =====================
// AUTH Routes
// =====================
// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            req.flash("error", err.message);
            return res.redirect("/register"); //if use res.render("register", {"error": err.message}) pass error message inside render
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp" + user.username); //why dont use req.body.username (from form) cause already register into db and return as user variable
            res.redirect("/campgrounds");
        });
    });
});

//Login Routes
router.get("/login", function(req, res){
    res.render("login");
});
// handling login logic
router.post("/login", passport.authenticate("local",
    {
        successFlash: "Successfully logged in", //can flash even using passport authenticate, authorization is checked for permission to do certain things
        successRedirect: "/campgrounds",
        failureFlash: "Failed to log in",
        failureRedirect: "/login"
    }), function(req, res) {
});

//Logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Successfully logged out");
    res.redirect("/campgrounds");
});

module.exports = router;