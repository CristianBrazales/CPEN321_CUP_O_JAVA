var express               = require("express");
var router                = express.Router();
var posting               = require("../database/posting");
var passport              = require("passport");
var postcode              = require('postcode-validator');



//creating a new add for the current user
router.post("/posting",function(req,res){
  var newPosting = new posting({username:req.body.username});
  newPosting.address = req.body.address;
  console.log("Room number from node backend:");
  console.log(req.body.roomNumber);
  if(req.body.roomNumber<0){

    res.send({"success":false, "message":"Invalid room number"});
    return;
  }
  newPosting.roomNumber = req.body.roomNumber;

  var isValidZipcode = postcode.validate(req.body.zipcode, 'CA');
  if(!isValidZipcode) {
    res.send({"success":false, "message":"Invalid zip code"});
    return;
  }

  newPosting.zipcode = req.body.zipcode;
  newPosting.smoke = req.body.smoke;
  newPosting.earlyMorningPerson = req.body.earlyMorningPerson;
  newPosting.partyPerson = req.body.partyPerson;
  //trying to post this data to the database
  posting.create(newPosting,function(err,returnedRoom){
    if(err){
      //console.log(err);
      res.send({"success":false, "message": "Error parsing data to database"});
      return;
    }
    else{
      // res.send(returnedCar);
      res.send({"success":true, "message": "Successfully created a post"});
      return;
    }
  });
});





module.exports = router;
