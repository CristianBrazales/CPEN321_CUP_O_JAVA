var express               = require("express");
var router                = express.Router();
var User                  = require("../database/users");
var passport              = require("passport");


//if the user authentication fails, just send a failure message to the react native
router.get("/success",function(req,res){
  console.log(req.user);
  res.send({"success":true, "message": req.user.username});
});

module.exports = router;
