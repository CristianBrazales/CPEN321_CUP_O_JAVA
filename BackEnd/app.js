
//================
//Initial initialization
//================

var express                  = require("express");
var app                      = express();
var bodyParser               = require("body-parser");
var request                  = require('request');
var mongoose                 = require("mongoose");
var methodOverride           = require("method-override");
var passport                 = require("passport");
var localStrategy            = require("passport-local");
var passportLocalMongoose    = require("passport-local-mongoose");
var expressSession           = require("express-session");
//var secure                   = require('express-force-https');

//database stuff

var User                     = require("./database/users");

//================
//Routes variables
//================

var signupRoute               = require("./routes/signup");
var homepageRoute             = require("./routes/homepage");
var loggedinRoute             = require("./routes/loggedin");
var failureRoute              = require("./routes/failure");

//================
//APP Config
//================


//connecting to the database
mongoose.connect("mongodb://localhost:27017/rental_tinder_database",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));






//express session initialization
app.use(expressSession({
    secret:"Shafi is the best",
    resave: false,
    saveUninitialized: false
}));

//passport initialization
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//================
//Routes
//================

app.use(homepageRoute);
app.use(signupRoute);
app.use(loggedinRoute);
app.use(failureRoute );
//==========
// Authentication routes
//===========

app.get("/login",function(req,res){
   res.render("login");
});

//authenticating the user credentials against the database
app.post("/login",passport.authenticate("local",{

    successRedirect:"/success",
    failureRedirect: "/failure"

}),function(req,res){

});

//LogOut
app.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/");
});


//this function checks if the user is logged in or not
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}





//starting the server
app.listen(5000,function(){
    console.log("Server has started");
});
