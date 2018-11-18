var express               = require("express");
var router                = express.Router();
var User                  = require("../database/users");
var passport              = require("passport");
var postcode              = require('postcode-validator');


// var validateEmail = function(email){
//     User.find({'email': email},function(err,user){
//       if(err){
//         console.log(err);
//       }
//       else if(user.length>0){
//         console.log("email exits");
//         return false;
//       }
//       else return true;
//     });
//   }

module.exports = {
  validateEmail : function(email){
    User.find({'email': email},function(err,user){
      if(err){
        console.log(err);
      }
      else if(user.length>0){
        console.log("email exits");
        return false;
      }
      else return true;
    });
  },

  validateRoomNumber: function(roomNumber){
    if(roomNumber<0) return false;
    else return true;
  },

  validateZipCode: function(zipcode){
    var isValidZipcode = postcode.validate(zipcode, 'CA');
    if(!isValidZipcode) {
      return false;
    }
      return true;
  }
};


//module.exports = validateEmail;
