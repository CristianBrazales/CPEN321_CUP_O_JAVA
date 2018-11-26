//module declarations
var express               = require("express");
var router                = express.Router();
var posting               = require("../database/posting");
var User                  = require("../database/users");
var passport              = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");
var Posting               = require("../database/posting");

router.post("/posts",function(req,res){
  Posting.find({username:req.body.username},function(err,foundUser){
    if(err){
      console.log(err);
      res.send({"success":false,"message":err});
      return;
    }
    res.send({"success":true,"message":foundUser});
  });
});

router.post("/edit/post",function(req,res){

  Posting.findById(req.body.id,function(err,foundPosting){
    if(err){
      console.log(err);
      res.send({"success":false, "message": err});
      return;
    }
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

    foundPosting.save();
    res.send({"success":true, "message":"Successfully updated post"});
    return;
  });
});

module.exports = router;
