var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    password: String,
    email: String,
    phonenumber: String,
    username: String
});

//adding passport support
userSchema.plugin(passportLocalMongoose);

var AppUser = mongoose.model("AppUser",userSchema);


module.exports = AppUser;
