// process.env.NODE_ENV = 'test';
//
// var chai = require('chai');
// var expect = chai.expect;
// var app = require ('../app.js');
// //var should = require('chai').should();
// var should = chai.should;
// var chaiHttp = require('chai-http');
// //var data = require('./fakedate.js');
// var assert = require('assert');
//
// chai.use(chaiHttp);
//
// var user1 = {
//     'username': 'user1',
//     'password': 'yikes'
// };
// /**
//  * Signup test
//  */
// describe("signup then login", function(){
//     beforeEach(function(done) {
//         db.clear(function(err) {
//           if (err) return done(err);
//
//         });
//       });
//     it("should create a new account and sign in to the account", function(){
//         chai.request(app).post('/register')
//             .set('content-type', 'application/x-www-form-urlencoded')
//             .send(user1)
//             .end(function(err, res){
//
//             });
//     });
// });
