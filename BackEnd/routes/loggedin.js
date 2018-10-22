var express               = require("express");
var router                = express.Router();
var User                  = require("../database/users");
var passport              = require("passport");


router.get("/loggedin",isLoggedIn,function(req,res){
  res.render("loggedinview");
});



//this function checks if the user is logged in or not
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect("/login");
}

module.exports = router;
