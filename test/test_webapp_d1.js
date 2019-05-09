const assert = require('chai').assert;
// const request = require('supertest');
// const expect = require('chai').expect;
// var supertest = require('supertest');
var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../webapp');
var messagebird = require('messagebird')('OhXugIBEZPFiUu0Aq1Dgx6bDv');

//var agent = supertest.agent(app);

//-------------------Testing Deliverable 1-------------------------//

//Testing if MessageBird is online
describe('Test MessageBird is online.', function () {
    it('Object output', function () {
        assert.equal(typeof (messagebird), "object")
    })
});

//Testing if Step 2 File loads after a successful login
var agent = chai.request.agent(app);

describe('Test login redirects to Step 2', function () {
    it('Should Login', function (done) {
        agent
            .post('/login')
            .type('form')
            .send({username: 'test', password: 'test'})
            .then(function (res) {
                var str = res.text;
                var patt= /Please enter your phone number in international format/i;
                var resu = patt.test(str);

                assert.equal(resu,true);
                done()
            });
    })
});

//Testing if Step 2 File doesn't loads after an unsuccessful login
var agent = chai.request.agent(app);

describe('Test login does not redirect when invalid', function () {
    it('Should not Login', function (done) {
        agent
            .post('/login')
            .type('form')
            .send({username: '', password: ''})
            .end(function(err, res) {
                // console.log(res.text)
                var str = res.text;
                var patt = /Invalid Login Info/i;
                var resu = patt.test(str);
                assert.equal(resu,true);
                done()
            })
    })
});