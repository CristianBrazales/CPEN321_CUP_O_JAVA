//module declarations
var express               = require("express");
var router                = express.Router();
var posting               = require("../database/posting");
var User                  = require("../database/users");
var passport              = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");
var Posting               = require("../database/posting");


//route handling
router.post("/posts",function(req,res){

  //trying to find the user and send all his/her posts to the front end
  Posting.find({username:req.body.username},function(err,foundUser){
    //error handling
    if(err){
      console.log(err);
      res.send({"success":false,"message":err});
      return;
    }
    res.send({"success":true,"message":foundUser});
  });
});

//route handling
router.post("/edit/post",function(req,res){
  //trying to find the add by id and updating it
  Posting.findById(req.body.id,function(err,foundPosting){
    //error handling
    if(err){
      console.log(err);
      res.send({"success":false, "message": err});
      return;
    }

    //editing the parameters for the ad/post
    foundPosting.address = req.body.address;
    foundPosting.zipcode = req.body.zipcode.toLowerCase();
    foundPosting.roomNumber = req.body.roomNumber;
    foundPosting.earlyMorningPerson = req.body.earlyMorningPerson;
    foundPosting.partyPerson = req.body.partyPerson;
    foundPosting.smoke = req.body.smoke;
    foundPosting.title = req.body.title;
    foundPosting.photo = req.body.photo;
    foundPosting.description = req.body.description;
    foundPosting.price = req.body.price;

    //saving the edited post to the database and sending success message to the front end
    foundPosting.save();
    res.send({"success":true, "message":"Successfully updated post"});
    return;
  });
});

module.exports = router;
