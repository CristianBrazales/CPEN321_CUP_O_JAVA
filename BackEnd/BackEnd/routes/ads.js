//module declarations
var express               = require("express");
var router                = express.Router();
var posting               = require("../database/posting");
var passport              = require("passport");
var postcode              = require('postcode-validator');
var validator             = require("../helperFunctions/validator.js");
var escapeStringRegexp    = require('escape-string-regexp');
//--------------------
// var multer = require('multer');
// var upload = multer({storage: storage});
// var storage = require('multer-gridfs-storage')({
//   url:'mongodb://localhost:27017/rental_tinder_database', useNewUrlParser: true
// });

// var formidable = require('express-formidable');
// //router.use(formidable());
// router.use(formidable({
//     //encoding: 'utf-8',
//     uploadDir: './uploads/',
//     multiples: true, // req.files to be arrays of files
//   }));
//--------------------



//creating a new add for the current user
router.post("/posting",
//--------------------
//upload.single('photo'),
//--------------------
function(req,res){

  var newPosting = new posting({username:req.body.username});
  newPosting.address = req.body.address;
  console.log("Room number from node backend:");
  console.log(req.body.roomNumber);

  //validating room Number
  var validRoomNumber = validator.validateRoomNumber(req.body.roomNumber);

  if(!validRoomNumber){
    res.send({"success":false, "message":"Invalid room number"});
    return;
  }




  newPosting.roomNumber = req.body.roomNumber;


  //validate zip code

  var isValidZipcode = validator.validateZipCode(req.body.zipcode);
    if(!isValidZipcode) {
    res.send({"success":false, "message":"Invalid zip code"});
    return;
  }


  //creating an object for search query
  newPosting.zipcode = req.body.zipcode.toLowerCase();
  newPosting.smoke = req.body.smoke;
  newPosting.earlyMorningPerson = req.body.earlyMorningPerson;
  newPosting.partyPerson = req.body.partyPerson;
  newPosting.title = req.body.title;
  //-------------------------
  //console.log("req file in ad.js: "+ req.file);
  //newPosting.image.data = req.file.buffer;
  //newPosting.image.contentType = req.file.mimetype;
  //newPosting.image64 = req.body.photo;
  //newPosting.img.path = req.files.photo.path;

  //-------------------------
  //newPosting.photo = req.body.photo;
  newPosting.description = req.body.description;

  newPosting.price = req.body.price;
  //trying to post this data to the database
  posting.create(newPosting,function(err,returnedRoom){
    //error handling
    if(err){
      //console.log(err);
      res.send({"success":false, "message": "Error parsing data to database"});
      return;
    }
    else{
      //if no error, let front end know that the post was successful
      res.send({"success":true, "message": "Successfully created a post"});
      return;
    }
  });
});





module.exports = router;
