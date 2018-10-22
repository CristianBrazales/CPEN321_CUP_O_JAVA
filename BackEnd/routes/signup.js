var express               = require("express");
var router                = express.Router();
var User                  = require("../database/users");
var passport              = require("passport");

router.get("/register",function(req,res){
  res.render("register");
});

router.post("/register",function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.render("error");
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/");
            });
        }

    });
});

module.exports = router;
