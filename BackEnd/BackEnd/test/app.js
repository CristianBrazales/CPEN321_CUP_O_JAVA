var chai = require('chai');
var expect = chai.expect;
var app = require ('../app.js');
//var should = require('chai').should();
var should = chai.should;
var chaiHttp = require('chai-http');
//var data = require('./fakedate.js');

chai.use(chaiHttp);

var user1 = {
    'username': 'user1',
    'password': 'yikes'
};

var zipcodeInval = {
    'address': '2525 East Mall',
    'username':'user1',
    'zipcode': '000000',
    'roomNumber': '4',
    'startDate': '05/01/2019',
    'endDate': '05/01/2020',
};

var roomnumInval = {
    'address':'2250 wesbrook mall',
    'username':'user1',
    'zipcode': 'V6T0A6',
    'roomNumber': -78,
    'startDate': '05/01/2019',
    'endDate': '05/01/2020',
};

var dateInval = {
    'address':'2250 wesbrook mall',
    'username':'user1',
    'zipcode': 'V6T0A6',
    'roomNumber': '-78',
    'startDate': '13/01/2019',
    'endDate': '05/01/2020',
};

var mismatch = {
    'address':'2250 wesbrook mall',
    'username':'user1',
    'zipcode': 'V6T2Z5',
    'roomNumber': '5',
    'startDate': '05/01/2019',
    'endDate': '05/01/2020',
};

var regularPost = {
    'address':'2250 wesbrook mall',
    'username':'user1',
    'zipcode': 'V6T0A6',
    'roomNumber': '3',
    'startDate': '05/01/2019',
    'endDate': '05/01/2020',
    'smoking': false,
    'partyPerson' : false,
    'earlyMorningPerson': false,
};

var searchPost = {

}
/**
*Signup test:
*   regular signup, signup with an existing user name, signup with invalid email
*/
describe ('Signup', function(){
    it('should add a new user', function(){
        chai.request(app).post('/register')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({username: 'user1', password: 'yikes'})
            .end(function(err, res){
                if (err) console.log(err);
                console.log(user1.username);
                console.log(res.status);
                //res.should.have.status(200);
                //expect(res.status).to.equal(200);
                //expect(res).to.be.json;
                expect(res).to.have.status(200);
                console.log("The res body is:");
                console.log(res.body.message);
                //res.body.should.have.property("message");
                expect(res.body.message).to.equal("error");
                //res.body.username.should.equal('user1');
            });
    });
    it('should check is the user already exits', function(){
        chai.request(app).post('/register')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({username: 'user1', password: 'oops'})
            .end(function(err, res){
                //res.should.be.json;
                expect(res.body.message).to.equal("error");
            });
    });
    //pending test
    // it ('should fail if user email is invalid');
    // it ('should fail if user email already exits');
    // it('should keep the user logged in');//how?
});

/**
 * Login test:
 *      regular login, wrong password, non-existing username
 */
describe ('Login', function(){
    describe('auth fails', function(){

        it('should fail if password incorrect', function(){
            chai.request(app).post('/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({username: 'user1', password: 'oops'})
            .end(function(err, res){
              expect(res.statusCode).to.equal(401);
              //err.should.have.status(401);
                //res.success.should.equal(false);
            });
        });
//
        it ('shoud fail if user does not exist', function(){
            chai.request(app).post('/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({username: 'user2', password: 'oops'})
                .end(function(err, res){
                    //res.should.have.status(401); why this line doesn't fuck
                    expect(res.statusCode).to.equal(401);
                });
        });
     });

    //regular login
    describe('regular login', function(){
        it('should send back the user name and success true if auth succeed', function(){
            chai.request(app).post('/login')
            .set('content-type', 'application/x-www-form-urlencoded')
                .send(user1)
                .end(function(err, res){
                    //res.should.be.json;
                    //res.body.success.should.equal(true);  //why thses lines dont work?
                    //console.log("res is from regular login is:"+ res.body);
                    //res.body.username.should.equal('user1');
                    expect(res.body.username).to.equal('user1');

                });
        });
    });

 });
//
// /**
//  * Post test:
//  *      invalid zip code, invalid room number, invalid data,
//  *      zip code and address mismatch,
//  *      regular post
//  */
 describe('Post', function(){
    describe('Invalid input tests', function(){
        // invalid zipcode
        it ('should fail if zipcode invalid', function(){
            chai.request(app). post('/posting')
            .set('content-type', 'application/x-www-form-urlencoded')
                .send(zipcodeInval)
                .end(function(err, res){

                    expect(res.body.success).to.equal(false);
                    expect(res.body.message).to.equal('Invalid zip code');
                });
        });

            // invalid room number
        it('should fail if room number invalid', function(){
            chai.request(app). post('/posting')
            .set('content-type', 'application/x-www-form-urlencoded')
                .send(roomnumInval)
                .end(function(err, res){
                    console.log(res.body);
                    expect(res.body.success).to.equal(false);
                    expect(res.body.message).to.equal('Invalid room number');
                });
        });


        // invalid date
        // it ('should fail if data invalid', function(){
        //     chai.request(app). post('/post')
        //     .set('content-type', 'application/x-www-form-urlencoded')
        //     .send(dataInval)
        //     .end(function(err, res){
        //         res.body.success.should.equal(false);
        //         res.body.message.should.equal('Invalid room number');
        //     });
        // });

    });
//     describe('mismatch fault', function(){
//         it ('should fail if address and zip code mismatch', function(){
//             chai.request(app). post('/post')
//             .set('content-type', 'application/x-www-form-urlencoded')
//                 .send(mismatch)
//                 .end(function(err, res){
//                     res.body.success.should.equal(false);
//                     res.body.message.should.equal('address and zip code mismatch');
//                 });
//     });
//     });
//
    describe('all correct inputs', function(){
        it ('should succeed if everything is set up correctly', function(){
            chai.request(app). post('/posting')
            .set('content-type', 'application/x-www-form-urlencoded')
                .send(regularPost)
                .end(function(err, res){
                    expect(res.body.success).to.equal(true);
                    //res.body.message.should.equal('Invalid room number');
                    expect(res.body.message).to.equal('Successfully created a post');
                });
                //done();
        });
    });
//
//
//
 });
/**
 * Search test:
 *      regular search
 */
describe ('Search', function(){
    it('should return the relevant results',function(){
      chai.request(app). post('/search')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(regularPost)
      .end(function(err,res){
        console.log("The search body returns:");
        console.log(res.body);
      });
    });
});
//
// describe('updata user profile', function(){
//
// });
