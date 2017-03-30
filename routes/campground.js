var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var middleware = require("../middleware") //no need ../middleware/index.js as index.js file is selected by default during requiring


//show all campgrounds route
router.get("/", function(req, res){
    Campground.find({}, function(err, dbCampground){
        if (err) {
          res.redirect("/campgrounds");
        } else {
          res.render("campgrounds/index", {campgrounds: dbCampground});  
        }
    });
});

//create route
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
      id: req.user._id,
      username: req.user.username
    };
    var newCampGround = {name: name, price: price, image: image, description: desc, author: author};
    Campground.create(newCampGround, function(err, newlyCreated){
        if (err) {
          res.redirect("/campgrounds");
        } else {
          req.flash("success", "Successfully added new campground");
          res.redirect("/campgrounds");  
        }
    });
});

//new route
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
    });

//show route
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err) {
          res.redirect("/campgrounds");
        } else {
          res.render("campgrounds/show", {campground: foundCampground});  
        }
    });
});

//edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    // console.log(req.params);
    // console.log("~~~~~~~~~~~~~~~~");
    // console.log(req.user);
    // console.log("~~~~~~~~~~~~~~~~");
    // console.log(req.body);
    // console.log("~~~~~~~~~~~~~~~~");
    Campground.findById((req.params.id), function(err, foundCampground){
      res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if (err) {
          res.redirect("/campgrounds");
        } else {
          // console.log(req.params);
          // console.log("~~~~~~~~~~~~~~~~");
          // console.log(req.user);
          // console.log("~~~~~~~~~~~~~~~~");
          // console.log(req.body);
          // console.log("~~~~~~~~~~~~~~~~");
          req.flash("success", "Campground updated");
          res.redirect("/campgrounds/" + req.params.id);  
        }
    });
});

//Destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if (err){
      res.redirect("/campgrounds");
    } else {
      req.flash("success", "Campground deleted");
      res.redirect("/campgrounds");
    }
  })
});






module.exports = router;