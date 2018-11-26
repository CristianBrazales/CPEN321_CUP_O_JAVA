//module declarations
var express               = require("express");
var router                = express.Router();
var User                  = require("../database/users");
var passport              = require("passport");
var postcode              = require('postcode-validator');




module.exports = {
  //this function checks if the user email exists or not, and if so, returns error
  validateEmail : function(email){
    //trying to find email based on user input
    User.find({'email': email},function(err,user){
      if(err){
        console.log(err);
      }
      //if the returned object after searching is >1, that means the email already exists
      else if(user.length>0){
        console.log("email exits");
        return false;
      }
      else return true;
    });
  },

  //this function checks if the room number is valid
  validateRoomNumber: function(roomNumber){
    if(roomNumber<0) return false;
    else return true;
  },

  //this function checks if the zipcode is valid, relies on other external function
  validateZipCode: function(zipcode){
    var isValidZipcode = postcode.validate(zipcode, 'CA');
    if(!isValidZipcode) {
      return false;
    }
      return true;
  }
};


//module.exports = validateEmail;
