//module declarations
var express               = require("express");
var router                = express.Router();
var bodyParser            = require("body-parser");
var nodemailer            = require("nodemailer");
var User                  = require("../database/users");
var xoauth2               = require('xoauth2');

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
  // var transporter = nodemailer.createTransport({
  //       host: 'smtp.mail.com',
  //       port: 587,
  //       secure: false, // true for 465, false for other ports
  //       auth: {
  //           user: 'cpen321cuopjava@gmail.com', // generated ethereal user
  //           pass: 'Cpen321@' // generated ethereal password
  //       }
  //       // pool: true, // use pooled connection
  //       // rateLimit: true, // enable to make sure we are limiting
  //       // maxConnections: 1, // set limit to 1 connection only
  //       // maxMessages: 3 // send 3 emails per second
  //   });

  //gmail setup
//   var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         xoauth2: xoauth2.createXOAuth2Generator({
//             user: 'cpen321cuopjava@gmail.com',
//             clientId: '575996118971-1avb3d7pg42jo9jo16gl9ruqf5pisbs7.apps.googleusercontent.com',
//             clientSecret: 'IbUs2CSjAFC3OG2wXX9jX2XQ',
//             refreshToken: '1/h02ispN6KLRrvZAqYBesvkKGxdMkuDK_3XzS-XTFsrFCVXRiKCMPKKW6tI7MU9bn'
//         })
//     }
// });

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'cpen321cuopjava@gmail.com',
        clientId: '575996118971-1avb3d7pg42jo9jo16gl9ruqf5pisbs7.apps.googleusercontent.com',
        clientSecret: 'IbUs2CSjAFC3OG2wXX9jX2XQ',
        refreshToken: '1/yGYdP_4Z3etIYXGdSYSnc-MGVAj3_F0SufAUs9ARPOQ',
        accessToken: 'ya29.GltfBrPBgy2AMcEiTKGa0QcnL4teWgwTkGvar3GWPcQJYhmSH8b6GuWbUb4MAYigecDFmZ5T_Vvq-eDqyn_nvJB2YCFy9SKMn0y5Mkm-MH933sKAuyKz2_FozUcv',
        expires: 1
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
