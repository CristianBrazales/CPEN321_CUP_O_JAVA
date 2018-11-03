var express               = require("express");
var router                = express.Router();
var User                  = require("../database/users");
var passport              = require("passport");

//if the user authentication fails, just send a failure message to the react native
router.get("/failure",function(req,res){
  console.log("Failure");
  res.send({"success":false, "message": "User not found"});
});



module.exports = router;
