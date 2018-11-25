//module declarations
var express               = require("express");
var router                = express.Router();
var posting               = require("../database/posting");
var passport              = require("passport");
var escapeStringRegexp    = require('escape-string-regexp');


//this route is for advance search
router.post("/search",function(req,res){
  //creating variables for use in search parameter
  var zipcode = req.body.zipcode.toLowerCase();
  var earlyMorningPerson = req.body.earlyMorningPerson;
  var partyPerson = req.body.partyPerson;
  var smoking = req.body.smoking;
  console.log("Received from front end is for searching:"+req.body);
  //trying to find posts based on search criteria, and if found, send the objects to the
  //front end
  posting.find({$and:[{"zipcode":zipcode},{"earlyMorningPerson":earlyMorningPerson},
  {"partyPerson":partyPerson},{"smoking":smoking}]}, function(err,foundPosting){
    if(err) {
      console.log(err);
      res.send({"success":false, "message":"Error in search"});
    }
    else{
      res.send({"success":true, "message": foundPosting});
    }
  });
});

//regex search
router.post("/regex",function(req,res){
  console.log(req.body.zipcode);
  if(1){
    //creating search parameter for our regex search
    var regexZip = new RegExp(escapeStringRegexp(req.body.zipcode.toLowerCase()), 'gi');
    var regexTitle = new RegExp(escapeStringRegexp(req.body.zipcode.toLowerCase()), 'gi');
    //console.log("The query is: " + regex);
    //trying to search the database based on the parameter, and if found, send the objects,
    //otherwise, send error message
    posting.find({$or:[{zipcode:regexZip},{title:regexTitle}]},function(err,foundPosting){
        if(err){
            console.log(err);
            res.send({"success":false, "message": "Error in search"});
        } else if(Object.keys(foundPosting).length<1){
          res.send({"success":false, "message": "Nothing found"});
        }

        else{
            res.send({"success":true, "message": foundPosting});
        }
});

} else{
  var regex = new RegExp(req.body.zipcode.toLowerCase(), 'gi');
  console.log("The query is: " + regex);
  res.send("nothing found");
}

});

module.exports = router;
