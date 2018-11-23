//module declarations
var express             = require("express");
var router              = express.Router();
var bodyParser            = require("body-parser");
var nodemailer            = require("nodemailer");
var User                  = require("../database/users");
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

  //send email
  const output = `<p>New Contact Request </p>
  <h3>Contact Details</h3>
  <li>Name: ${req.body.name}</li>
  <li>Phone number: ${req.body.phonenumber}</li>
  <li>Email: ${req.body.email}</li>
  <h3>Message</h3>
  <p>${req.body.message}</p>`;

  //nodemailer stuff
  var transporter = nodemailer.createTransport({
        host: 'smtp.mail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'cpen321@mail.com', // generated ethereal user
            pass: 'Cpen321@' // generated ethereal password
        }
        // pool: true, // use pooled connection
        // rateLimit: true, // enable to make sure we are limiting
        // maxConnections: 1, // set limit to 1 connection only
        // maxMessages: 3 // send 3 emails per second
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
            return console.log(error);
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
