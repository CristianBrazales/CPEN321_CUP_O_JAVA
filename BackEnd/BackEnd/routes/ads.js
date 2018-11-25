//module declarations
var express               = require("express");
var router                = express.Router();
var posting               = require("../database/posting");
var passport              = require("passport");
var postcode              = require('postcode-validator');
var validator             = require("../helperFunctions/validator.js");




//creating a new add for the current user
router.post("/posting",function(req,res){
  var newPosting = new posting({username:req.body.username});
  newPosting.address = req.body.address;
  console.log("Room number from node backend:");
  console.log(req.body.roomNumber);

  //validating room Number
  var validRoomNumber = validator.validateRoomNumber(req.body.roomNumber);

  if(!validRoomNumber){
    res.send({"success":false, "message":"Invalid room number"});
    return;
  }

  // if(req.body.roomNumber<0){
  //
  //   res.send({"success":false, "message":"Invalid room number"});
  //   return;
  // }


  newPosting.roomNumber = req.body.roomNumber;


  //validate zip code

  var isValidZipcode = validator.validateZipCode(req.body.zipcode);
    if(!isValidZipcode) {
    res.send({"success":false, "message":"Invalid zip code"});
    return;
  }

  // var isValidZipcode = postcode.validate(req.body.zipcode, 'CA');
  // if(!isValidZipcode) {
  //   res.send({"success":false, "message":"Invalid zip code"});
  //   return;
  // }

  //creating an object for search query
  newPosting.zipcode = req.body.zipcode.toLowerCase();
  newPosting.smoke = req.body.smoke;
  newPosting.earlyMorningPerson = req.body.earlyMorningPerson;
  newPosting.partyPerson = req.body.partyPerson;
  newPosting.title = req.body.title;
  newPosting.photo = req.body.photo;
  newPosting.description = req.body.description;
  //trying to post this data to the database
  posting.create(newPosting,function(err,returnedRoom){
    //error handling
    if(err){
      //console.log(err);
      res.send({"success":false, "message": "Error parsing data to database"});
      return;
    }
    else{
      // res.send(returnedCar);
      //if no error, let front end know that the post was successful
      res.send({"success":true, "message": "Successfully created a post"});
      return;
    }
  });
});





module.exports = router;
