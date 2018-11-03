var express               = require("express");
var router                = express.Router();
var posting               = require("../database/posting");
var passport              = require("passport");

//creating a new add for the current user
router.post("/posting/:id",function(req,res){
  var newPosting = new posting({username:req.params.id});
  newPosting.address = req.body.address;
  newPosting.roomNumber = req.body.roomNumber;
  //trying to post this data to the database
  posting.create(newPosting,function(err,returnedRoom){
    if(err){
      //console.log(err);
      res.send({"success":false, "message": "Error parsing data to database"});
    }
    else{
      // res.send(returnedCar);
      res.send({"success":true, "message": "Successfully created a post"});
    }
  });
});





module.exports = router;
