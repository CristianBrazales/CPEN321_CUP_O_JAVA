var express               = require("express");
var router                = express.Router();
var User                  = require("../database/users");
var passport              = require("passport");

router.get("/register",function(req,res){
  res.render("register");
});

//this function will create a new user based on the data sent from the app and save
//it on the database
router.post("/register",function(req,res){
    //creating a new user
    var newUser = new User({username:req.body.username});
    newUser.email = req.body.email;
    newUser.phonenumber = req.body.phonenumber;
    //trying to save the user to the database
    User.register(newUser,req.body.password,function(err,user){
        if(err){
          //if there is an error, prints out the error message and render the error page
            console.log(err);
            console.log(newUser);
            res.render("error");
        }
        else{
            //else, save the user
            passport.authenticate("local")(req,res,function(){
                console.log(req.body);
                res.redirect("/");
            });
        }

    });
});

module.exports = router;
