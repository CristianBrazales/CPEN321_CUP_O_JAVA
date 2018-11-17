var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//creating the user object model, an user has
//password, email, phonenumber and username
var userSchema = new mongoose.Schema({
    password: String,
    email: String,
    phonenumber: String,
    username: String
});

//adding passport support
userSchema.plugin(passportLocalMongoose);

var AppUser = mongoose.model("AppUser",userSchema);

//exporting the router to the app.js file
module.exports = AppUser;
