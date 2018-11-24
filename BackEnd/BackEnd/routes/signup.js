//module declarations
var express               = require("express");
var router                = express.Router();
var User                  = require("../database/users");
var passport              = require("passport");
var validator             = require("../helperFunctions/validator.js");

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


    //validating email
    //console.log(validator.validateRoomNumber(-20));
  //  console.log(validator.validateEmail("shafi.rpl@gmail.com"))
    //var validEmail = validator(newUser.email);
    //console.log("Valid email output is:"+validEmail);

    // if(!validEmail){
    //   res.send({"success":false, "message":"Email exists"});
    //   return;
    // }

    //check to see if the email exists, and if so, send an error message
    User.find({'email': req.body.email},function(err,user){
      if(err){
        console.log(err);
      }
      else if(user.length>0){
        console.log("email exits");
        res.send({"success":false, "message":"Email exists"});
        return;
      }
    });
    //trying to save the user to the database
    User.register(newUser,req.body.password,function(err,user){
        if(err){
          //if there is an error, prints out the error message and render the error page
            console.log(err);
            console.log(newUser);
            res.send({"success":false, "message":err});
        }
        else{
            //else, save the user
            passport.authenticate("local")(req,res,function(){
                res.send({"success":true, "message":"successful"});
                console.log(req.body);
                //res.redirect("/");
            });
        }

    });
});

module.exports = router;
