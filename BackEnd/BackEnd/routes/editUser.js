//module declarations
var express               = require("express");
var router                = express.Router();
var posting               = require("../database/posting");
var User                  = require("../database/users");
var passport              = require("passport");

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
router.put("/user/edit",function(req,res){
  //User.findOneAndUpdate({'username':req.body.username},function(err,foundUser));
  res.send("hello");
});
module.exports = router;
