var express               = require("express");
var router                = express.Router();
var User                  = require("../database/users");
var passport              = require("passport");


router.get("/failure",function(req,res){
  res.send("Failure");
});



module.exports = router;
