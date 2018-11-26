var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


//creating the user object model, an user has
//password, email, phonenumber and username
var postingSchema = new mongoose.Schema({
    username: String,
    address: String,
    roomNumber: Number,
    earlyMorningPerson: Boolean,
    partyPerson: Boolean,
    title: String,
    zipcode: String,
    smoke: Boolean,
    cooking: String,
    photo: String,
    price: Number,
    description: String,
    Startdate: Date,
    EndDate:Date
    //---------------------
    , image:{
        data: Buffer, contentType: String, path:String
    },
    image64: String
    //---------------------
});

//adding passport support
postingSchema.plugin(passportLocalMongoose);

var Posting = mongoose.model("Posting",postingSchema);

//exporting the router to the app.js file
module.exports = Posting;
