//module declarations
var express               = require("express");
var router                = express.Router();
var posting               = require("../database/posting");
var User                  = require("../database/users");
var passport              = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");
var Posting               = require("../database/posting");
var validator             = require("../helperFunctions/validator.js");
var escapeStringRegexp    = require('escape-string-regexp');


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
    console.log(req.body.id);
    if(err){
      console.log(err);
      res.send({"success":false, "message": err});
      return;
    }

    console.log(foundPosting);
    //check if the room number is a string or number
    if(isNaN(Number(req.body.roomNumber))){
      res.send({"success":false, "message": "Invalid room number"});
      return;
    }

    //validating room Number
    var validRoomNumber = validator.validateRoomNumber(req.body.roomNumber);

    if(!validRoomNumber){
      res.send({"success":false, "message":"Invalid room number"});
      return;
    }

    //validate zip code

    var isValidZipcode = validator.validateZipCode(req.body.zipcode);
      if(!isValidZipcode) {
      res.send({"success":false, "message":"Invalid zip code"});
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
