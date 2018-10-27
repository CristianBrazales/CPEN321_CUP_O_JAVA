var express               = require("express");
var router                = express.Router();
var User                  = require("../database/users");
var passport              = require("passport");

router.get("/register",function(req,res){
  res.render("register");
});

router.post("/register",function(req,res){
    var newUser = new User({username:req.body.username});
    newUser.email = req.body.email;
    newUser.phonenumber = req.body.phonenumber;
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            console.log(newUser);
            res.render("error");
        }
        else{
            passport.authenticate("local")(req,res,function(){
                console.log(req.body);
                res.redirect("/");
            });
        }

    });
});

module.exports = router;
