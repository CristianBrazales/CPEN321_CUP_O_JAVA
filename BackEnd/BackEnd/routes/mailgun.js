
//module declarations
var express               = require("express");
var router                = express.Router();
var bodyParser            = require("body-parser");
var nodemailer            = require("nodemailer");
var User                  = require("../database/users");
var xoauth2               = require('xoauth2');

var api_key = '565a959730af24d30f8bd1f0f50509bc-1053eade-8c5753b3';
var domain = 'sandboxade085b0501b4c4986797374cfd5a3ec.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var email;

router.post("/email",function(req,res){
  User.findOne({'username':req.body.username},function(err,foundUser){
    if(err){
      console.log(err);
      res.send({"success":false,"message":err});
      return;
    }
    //var tempEmail = '+foundUser.email+';
    //email = "\""+foundUser.email+"\"";
    email = foundUser.email;
    email = email.toString();
    console.log(email.toString());

    const output = `New Contact Request
    Contact Details
    Name: ${req.body.name}
    Phone number: ${req.body.phonenumber}
    Email: ${req.body.email}
    Message
    ${req.body.message}`;

    //mailgun


    var data = {
      from: 'From Rental Tinder App <me@samples.mailgun.org>',
      to: email,
      subject: 'New Contact Request',
      text: output
    };

    mailgun.messages().send(data, function (error, body) {
      console.log(body);
      if(error){
        console.log(error);
        res.send({"success":false, "message":error});
        return;
      }
      res.send({"success":true, "message":"Email successfully sent"});
      return;
    });


  });
});




module.exports = router;
