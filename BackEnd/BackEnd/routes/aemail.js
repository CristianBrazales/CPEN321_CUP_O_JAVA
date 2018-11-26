//module declarations
var express               = require("express");
var router                = express.Router();
var bodyParser            = require("body-parser");
var nodemailer            = require("nodemailer");
var User                  = require("../database/users");
var xoauth2               = require('xoauth2');

var email;

//route handler for email
router.post("/email",function(req,res){

//trying to retrive the user email and then send the email
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

  //send email

  //this serves as the message body for the email
  const output = `<p>New Contact Request </p>
  <h3>Contact Details</h3>
  <li>Name: ${req.body.name}</li>
  <li>Phone number: ${req.body.phonenumber}</li>
  <li>Email: ${req.body.email}</li>
  <h3>Message</h3>
  <p>${req.body.message}</p>`;


//this sets up the smtp server for nodemailer
let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'cpen321cuopjava@gmail.com',
    pass: 'Cpen321@'
  }
});

    // setup email data with unicode symbols
    console.log(email);
    var mailOptions = {
        from: "Rental Tinder App", // sender address
        to: email, // list of receivers
        //to: 'shafi.rpl@gmail.com',
        subject: 'New contact request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
             console.log(error);
             res.send(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        //redirecting to contact page saying message successfully sent
        res.send({"success":true, "message":"email sent"});
    });
});

});



module.exports = router;
