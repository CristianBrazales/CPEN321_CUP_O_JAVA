//module declarations
var express               = require("express");
var router                = express.Router();
var posting               = require("../database/posting");
var User                  = require("../database/users");
var passport              = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");
var Posting               = require("../database/posting");
var validator             = require("../helperFunctions/validator.js");
var escapeStringRegexp    = require('escape-string-regexp');

//route handler

//this route deletes the user post based on the post object id

router.post("/delete",function(req,res){
  //trying to find the object by id and removing it
  Posting.findByIdAndRemove(req.body.id,function(err,data){
    if(err){
      console.log(err);
      res.send({"success":false, "message":"Can't delete this post"});
      return;
    }
    res.send({"success":true, "message":"Successfully Deleted Post"});
  });
});


module.exports = router;
