//process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;
var app = require ('../app.js');
var assert = require('assert');
var user = require('../database/users');
var post = require('../database/posting')
var mongoose = require('mongoose');
var validator = require('../helperFunctions/validator');

//var mgdb = mongoose.connect("mongodb://localhost:27017/unit_testing");
describe("signup unit tests", function(){
    beforeEach(function (done) {
        mongoose.connect('mongodb://localhost:27017/unit_testing', function(){
            mongoose.connection.db.dropDatabase(function(){
                done()
            });
        });
    });

    it ("should register the user", function(done){
        var newUser = new user({username: 'newuser'});
        newUser.email = "123@ubc.ca";
        var pw = "12345";
        user.register(newUser, pw, function(err, user){
            expect(user.username).to.equal(newUser.username);
            done();
        });
    });

    //it ("should fail if the username already exits");
});

describe("login unit tests", function(){
    var user1 = new user({username: "user1"});
    user1.email = "123@ubc.ca";
    user1.password = "12345";
    before(function (done) {
        mongoose.connect('mongodb://localhost:27017/unit_testing', function(){
            mongoose.connection.db.dropDatabase(function(){
                //done();
            });
            user1.save().then(function(){
                assert(user1.isNew);
            });
            done();
        });
    });
    after(function(done){
        mongoose.connect('mongodb://localhost:27017/unit_testing', function(){
            mongoose.connection.db.dropDatabase(function(){
                done()
            });
        });
    });
    it("should login to the account", function(){

    });
});

describe("search unit tests", function(){
    var p = new post({
        username: 'user1',
        address: '1234 main mall',
        roomNumber: 4,
        earlyMorningPerson: true,
        partyPerson:true,
        zipcode: 'V6N1X2',
        smoking: true,
        cooking: true,
    });
    before(function (done) {
        mongoose.connect('mongodb://localhost:27017/unit_testing', function(){
            mongoose.connection.db.dropDatabase(function(){
                //done();
            });
            p.save().then(function(){
                assert(p.isNew);
            });
            done();
        });
    });

    // after(function(done){
    //     mongoose.connect('mongodb://localhost:27017/unit_testing', function(){
    //         mongoose.connection.db.dropDatabase(function(){
    //             done()
    //         });
    //     });
    // });

    it ("should not find anything", function(done){
        post.find({smoking: false}, function(err, found){
            expect(found).has.length(0);
            done();
        });
    });

    // it ("should find user1", function(done){
    //     post.find({smoking:true}, function(err, found){
    //         expect(found).length.greaterThan(0);
    //         done();
    //     });
    // });
});

describe("creating post unit test", function(){
    beforeEach(function (done) {
        mongoose.connect('mongodb://localhost:27017/unit_testing', function(){
            mongoose.connection.db.dropDatabase(function(){
                done()
            });
        });
    });
    afterEach(function(done){
        mongoose.connect('mongodb://localhost:27017/unit_testing', function(){
            mongoose.connection.db.dropDatabase(function(){
                done()
            });
        });
    });
    it ("should add a new post", function(done){
        var newPost = new post({
            username: 'user2',
            address: '1234 main mall',
            roomNumber: 4,
            earlyMorningPerson: false,
            partyPerson:false,
            zipcode: 'V6N1X2',
            smoking: false,
            cooking: false,
        });

        post.create(newPost, function(err, ret){
            //console.log(ret);
            expect(ret.username).equals('user2');
            done();
        });
    });
});

describe("valadator test", function(){
    it ("should return false on invalid zipcode", function(){
        var zc = "";
        var valid = validator.validateZipCode(zc);
        assert(!valid);
    });

    it ("should return true on valid zipcode", function(){
        var zc = "V6N2Z7";
        var valid = validator.validateZipCode(zc);
        assert(valid);
    });

    it ("should return false if the room number is negative", function(){
        var roomnum = -9;
        var valid = validator.validateRoomNumber(roomnum);
        assert(!valid);
    });

    it ("should return true if the room number is valid", function(){
        var roomnum = 8;
        var valid = validator.validateRoomNumber(roomnum);
        assert(valid);
    });
});
