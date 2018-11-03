var express               = require("express");
var router                = express.Router();
var posting               = require("../database/posting");
var passport              = require("passport");

router.post("/search",function(req,res){
  var zipcode = req.body.zipcode;
  var earlyMorningPerson = req.body.earlyMorningPerson;
  var partyPerson = req.body.partyPerson;
  var smoking = req.body.smoking;
  posting.find({$and:[{"zipcode":zipcode},{"earlyMorningPerson":earlyMorningPerson},
  {"partyPerson":partyPerson},{"smoking":smoking}]}, function(err,foundPosting){
    if(err) {
      console.log(err);
      res.send({"success":false, "message":"Error in search"});
    }
    else{
      res.send(foundPosting);
    }
  });
});

module.exports = router;
