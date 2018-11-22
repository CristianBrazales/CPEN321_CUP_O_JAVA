var express               = require("express");
var router                = express.Router();
var posting               = require("../database/posting");
var passport              = require("passport");

router.post("/search",function(req,res){
  var zipcode = req.body.zipcode.toLowerCase();
  var earlyMorningPerson = req.body.earlyMorningPerson;
  var partyPerson = req.body.partyPerson;
  var smoking = req.body.smoking;
  console.log("Received from front end is for searching:"+req.body);
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
    var regex = new RegExp(req.body.zipcode, 'gi');
    console.log("The query is: " + regex);
    posting.find({zipcode:regex},function(err,foundPosting){
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
  var regex = new RegExp(req.body.zipcode, 'gi');
  console.log("The query is: " + regex);
  res.send("nothing found");
}

});

module.exports = router;
