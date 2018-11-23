//module declarations
var express               = require("express");
var router                = express.Router();
var posting               = require("../database/posting");
var User                  = require("../database/users");
var passport              = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");

//router
//getting all the information about the username and sending it to the frontend
router.post("/user",function(req,res){
  User.findOne({'username':req.body.username},function(err,foundUser){
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
      foundUser.email = req.body.email;
      foundUser.phonenumber = req.body.phonenumber;
      //saving the edited user
      foundUser.save();
      res.send({"success": true, "message": "Successfully updated user"});
      return;
    });

  });
  //res.send("hello");
});
module.exports = router;
