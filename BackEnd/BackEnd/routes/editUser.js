//module declarations
var express               = require("express");
var router                = express.Router();
var posting               = require("../database/posting");
var User                  = require("../database/users");
var passport              = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");
var emailValidator        = require("email-validator");


//router handling for editing user

//getting all the information about the username and sending it to the frontend
router.post("/user",function(req,res){
  User.findOne({'username':req.body.username},function(err,foundUser){
    //error handling
    if(err){
      console.log(err);
      res.send({"success":false, "message": "Error in the backend"});
    }
    else{
      res.send({"success":true, 'message':foundUser});
    }
  });
});


//updating the user profile
router.post("/user/edit",function(req,res){
  //trying to check if the email address is in right format
  var isValidEmail = emailValidator.validate(req.body.email.toLowerCase());

  if(!isValidEmail){
    res.send({"success":false, "message":{"message":"Email in invalid format"}});
    return;
  }

  //trying to find the user
  User.findOne({'username':req.body.username},function(err,foundUser){
    if(err){
      console.log(err);
      res.send({"success":false,"message":"User doesn't exist"});
      return;
    }
    //setting the password for the user
    foundUser.setPassword(req.body.password,function(err){
      if(err){
        console.log(err);
        res.send({"success":false, "message": "Reset password failed"});
        return;
      }
      //editing other parameters for the user
      foundUser.email = req.body.email.toLowerCase();
      foundUser.phonenumber = req.body.phonenumber;
      //saving the edited user
      foundUser.save();
      res.send({"success": true, "message": "Successfully updated user"});
      return;
    });
  });
});
module.exports = router;
