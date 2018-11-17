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
}

var zipcodeInval = {
    'address': '2525 East Mall',
    'username':'user1',
    'zipcode': '000000', 
    'rooms': '4', 
    'startDate': '05/01/2019', 
    'endDate': '05/01/2020',
}

var roomnumInval = {
    'address':'2250 wesbrook mall',
    'username':'user1',
    'zipcode': 'V6T0A6', 
    'rooms': '-78', 
    'startDate': '05/01/2019', 
    'endDate': '05/01/2020',
}

var dateInval = {
    'address':'2250 wesbrook mall',
    'username':'user1',
    'zipcode': 'V6T0A6', 
    'rooms': '-78', 
    'startDate': '13/01/2019', 
    'endDate': '05/01/2020',
}

var mismatch = {
    'address':'2250 wesbrook mall',
    'username':'user1',
    'zipcode': 'V6T2Z5', 
    'rooms': '5', 
    'startDate': '05/01/2019', 
    'endDate': '05/01/2020',
}

var regularPost = {
    'address':'2250 wesbrook mall',
    'username':'user1',
    'zipcode': 'V6T0A6', 
    'rooms': '3', 
    'startDate': '05/01/2019', 
    'endDate': '05/01/2020',
}
/** 
*Signup test: 
*   regular signup, signup with an existing user name, signup with invalid email  
*/
describe ('Signup', function(){
    it('should add a new user', function(){
        chai.request(app).post('/register')
            .send({'username': 'user1', 'password': 'yikes'})
            .end(function(err, res){
                if (err) console.log(err);
                console.log(user1.username);
                console.log(res.status);
                res.should.have.status(200);
                //expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                res.body.should.have.property('username');
                res.body.username.should.equal('user1');
            }); 
    });
    it('should check is the user already exits', function(){
        chai.request(app).post('/signup')
            .send({'username': 'user1', 'password': 'oops'})
            .end(function(err, res){
                res.should.be.json;
                res.body.message.should.equal('Username already exits'); 
            });
    });

    it ('should fail if user email is invalid');
    it ('should fail if user email already exits');
    it('should keep the user logged in');//how?
});

/**
 * Login test: 
 *      regular login, wrong password, non-existing username
 */
describe ('Login', function(){
    describe('auth fails', function(){

        it('should fail if password incorrect', function(){
            chai.request(app).post('/login')
            .send({'username': 'user1', 'password': 'oops'})
            .end(function(err, res){
                res.success.should.equal(false);
            });
        });

        it ('shoud fail if user does not exist', function(){
            chai.request(app).post('/login')
                .send({'username': 'user2', 'password': 'oops'})
                .end(function(err, res){
                    res.success.should.equal(false);
                });
        });
    });
    // regular login
    describe('regular login', function(){
        it('should send back the user name and success true if auth succeed', function(){
            chai.request(app).post('/login')
                .send(user1)
                .end(function(err, res){
                    res.should.be.json;
                    res.body.success.should.equal(true);
                    res.body.username.should.equal('user1');
                });
        });
    });
    
});

/**
 * Post test: 
 *      invalid zip code, invalid room number, invalid data,
 *      zip code and address mismatch, 
 *      regular post
 */
describe('Post', function(){
    describe('Invalid input tests', function(){
        // invalid zipcode
        it ('should fail if zipcode invalid', function(){
            chai.request(app). post('/post')
                .send(zipcodeInval)
                .end(function(err, res){
                    res.body.success.should.equal(false);
                    res.body.message.send.equal('Invalid zip code');
                });
        });

            // invalid room number
        it('should fail if room number invalid', function(){
            chai.request(app). post('/post')
                .send(roomnumInval)
                .end(function(err, res){
                    res.body.success.should.equal(false);
                    res.body.message.should.equal('Invalid room number');
                });
        });
        

        // invalid date
        it ('should fail if data invalid', function(){
            chai.request(app). post('/post')
            .send(dataInval)
            .end(function(err, res){
                res.body.success.should.equal(false);
                res.body.message.should.equal('Invalid room number');
            });
        });
        
    });
    describe('mismatch fault', function(){
        it ('should fail if address and zip code mismatch', function(){
            chai.request(app). post('/post')
                .send(mismatch)
                .end(function(err, res){
                    res.body.success.should.equal(false);
                    res.body.message.should.equal('address and zip code mismatch');
                });
    });
    });
    
    describe('all correct inputs', function(){
        it ('should succeed if everything is set up correctly', function(done){
            chai.request(app). post('/post')
                .send(regularPost)
                .end(function(err, res){
                    res.body.success.should.equal(true);
                    //res.body.message.should.equal('Invalid room number');
                    res.body.message.should.equal('posted');
                });
                done();
        });
    });
    


});
/**
 * Search test: 
 *      regular search
 */
describe ('Search', function(){
    it('should return the relevant results');
});

describe('updata user profile', function(){

});
