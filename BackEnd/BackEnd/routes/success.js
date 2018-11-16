var express               = require("express");
var router                = express.Router();
var User                  = require("../database/users");
var passport              = require("passport");


//if the user authentication fails, just send a failure message to the react native

router.get("/success/:id",function(req,res){
  //var hello = req.user.username;
  //console.log(hello);
  //var hello = "Junk";
  //console.log(user);
  console.log(req.params);
  var user = req.params.id;
  console.log(user);
  res.send({"success":true, "username": user});
});

module.exports = router;
