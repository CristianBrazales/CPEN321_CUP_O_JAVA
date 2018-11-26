
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
//----------------------
var formidable = require('express-formidable');
app.use(formidable());
//----------------------
//var secure                   = require('express-force-https');
var postcode                 = require('postcode-validator');

//database stuff

var User                     = require("./database/users");
var Posting                  = require("./database/posting");

var user;

//================
//Routes variables
//================

var signupRoute               = require("./routes/signup");
var homepageRoute             = require("./routes/homepage");
var loggedinRoute             = require("./routes/loggedin");
var failureRoute              = require("./routes/failure");
var successRoute              = require("./routes/success");
var postingRoute              = require("./routes/ads");
var searchRoute               = require("./routes/searching");
var editUserRoute             = require("./routes/editUser");
var editPostRoute             = require("./routes/editPosts");
var emailRoute                = require("./routes/aemail");
//================
//APP Config
//================


//connecting to the database
mongoose.connect("mongodb://localhost:27017/rental_tinder_database",{ useNewUrlParser: true });
//app.use(bodyParser.json());
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

app.use(function(req,res,next){
    user = req.user;
    //To move on to the next part or after what the middleware comes
    //we need next
    next();
});

app.use(homepageRoute);
app.use(signupRoute);
app.use(loggedinRoute);
app.use(failureRoute );
app.use(successRoute);
app.use(postingRoute);
app.use(searchRoute);
app.use(editUserRoute);
app.use(editPostRoute);
app.use(emailRoute);
//==========
// Authentication routes
//===========

app.get("/login",function(req,res){
   res.render("login");
});

//authenticating the user credentials against the database
app.post("/login",function(req,res,next){
  User.find({"username":req.body.username},function(err,foundUser){
    if(err){
      console.log(err);
      return next();
    }
      console.log(foundUser);
      if(foundUser.length>0){
        user = foundUser[0].username;
        console.log(user);
      }

      next();

  });
},
// passport.authenticate("local",{
//
//     successRedirect:"/success" + "/" + user,
//     failureRedirect: "/failure"
//
// }),function(req,res){
//  console.log(req.body);
// });

passport.authenticate("local"),

  function(req,res){
    res.redirect("/success/"+user);
  },function(req,res){
 console.log(req.body);
});


// app.post("/login",function(req,res){
//  console.log(req.body);
// });

//LogOut
app.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/");
});


// function findUser(){
//   User.find({"username":req.body.username},function(err,foundUser){
//     if(err){
//       return next();
//     }
//       user = foundUser.username;
//       console.log(user);
//
//   });
// }

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

module.exports = app;
