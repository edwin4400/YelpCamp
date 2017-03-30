var express = require("express"),
    app = express(),
    request = require("request"),
    bodyParser = require("body-parser"),
    flash = require("connect-flash"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    User = require("./models/user"),    
    Comment = require("./models/comment"),
    SeedDB = require("./seeds");

//requiring routes
var commentRoutes = require("./routes/comment");
var campgroundRoutes = require("./routes/campground");
var indexRoutes = require("./routes/index");


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");// use user info on every view template
app.use(methodOverride("_method"));
app.use(flash());
//SeedDB(); //seed the database

//Passport config
app.use(require("express-session")({
    secret: "I am the supreme commander of north atlantic sea!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//passing variables from request to response template otherwise hardcoded variable might be undefine if not generated.
app.use(function (req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

//use routes
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(process.env.PORT, process.env.ID, function(){
   console.log("YelpCamp App has started!!"); 
});