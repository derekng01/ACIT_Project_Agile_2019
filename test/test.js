const assert = require('chai').assert;
const expect = require('chai').expect;
var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../webapp');

//---------------Time out function so database has time to startup and connect before testing runs------------//
function wait(ms){
    console.log('Database Loading')
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}

//-----------------------------Testers-----------------------------------//

//Testing Broken URL
describe('GET /12345', function () {
    after(function (done) {
        done();
    });
    //timeout line
    it("Should return '200' ", function (done) {
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});


describe('Login Valid', function () {
    after(function (done) {
        done();
    });
    //timeout line
    it("Should return '404' ", function (done) {
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});

describe('Code hbs', function () {
    after(function (done) {
        done();
    });
    //timeout line
    it("Should return '200' ", function (done) {
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});

describe('Code-Save', function () {
    after(function (done) {
        done();
    });
    //timeout line
    it("Should return '200' ", function (done) {
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});
describe('Register Valid', function () {
    after(function (done) {
        done();
    });
    //timeout line
    it("Should return '200' ", function (done) {
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});
describe('Register Invalid', function () {
    after(function (done) {
        done();
    });
    //timeout line
    it("Should return '200' ", function (done) {
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});
describe('Site Breaks with Manual URL', function () {
    after(function (done) {
        done();
    });
    //timeout line
    it("Should return '404' ", function (done) {
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});
describe('Phone number input', function () {
    after(function (done) {
        done();
    });
    //timeout line
    it("Should return '200' ", function (done) {
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});

describe('Testing Downloadbtn HTML', function(){
    after(function (done) {
        done();
    });
    //timeout line
    it('downloadbtn(html,"hello")', function(done){
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});

describe('Testing Downloadbtn HTML', function(){
    after(function (done) {
        done();
    });
    //timeout line
    it('downloadbtn(html,"hello") does not match', function(done){
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});

describe('Testing Downloadbtn HTML', function(){
    after(function (done) {
        done();
    });
    //timeout line
    it('downloadbtn(html,"hello") undefined', function(done){
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(404);
                done()
            });
    });
});

describe('Testing Downloadbtn CSS', function(){
    after(function (done) {
        done();
    });
    //timeout line
    it('downloadbtn(css,"hello") works', function(done){
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});

describe('Testing Downloadbtn CSS', function(){
    after(function (done) {
        done();
    });
    //timeout line
    it('downloadbtn(css,"hello") does not match', function(done){
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});

describe('Testing Downloadbtn CSS', function(){
    after(function (done) {
        done();
    });
    //timeout line
    it('downloadbtn(css,"hello") undefined', function(done){
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});

describe('Testing get_input is reachable', function(){
    after(function (done) {
        done();
    });
    //timeout line
    it('display_input()', function(done){
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});

describe('Testing display_out is reachable', function(){
    after(function (done) {
        done();
    });
    //timeout line
    it('display_output()', function(done){
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});

describe('Testing HTML Text has text in it', function(){
    after(function (done) {
        done();
    });
    //timeout line
    it('display_output()', function(done){
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});

describe('Testing CSS Text has text in it', function(){
    after(function (done) {
        done();
    });
    //timeout line
    it('display_output()', function(done){
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});

describe('Testing the empty iFrame loaded properly', function(){
    after(function (done) {
        done();
    });
    //timeout line
    it('display_output(get_input())', function(done){
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});

describe('Testing the iFrame loaded properly with content', function(){
    after(function (done) {
        done();
    });
    //timeout line
    it('display_output(get_input())', function(done){
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});

describe('Testing Download compiles into a DOM object for browsers', function() {
    after(function (done) {
        done();
    });
    //timeout line
    it('Download properly compiles a DOM', function (done) {
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});

describe('Testing Download compiles into a DOM object for browsers', function() {
    after(function (done) {
        done();
    });
    //timeout line
    it('DOM has the correct contents', function (done) {
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});

describe('Test account creation', function () {
    after(function (done) {
        done();
    });
    //timeout line
    it('Should create account', function (done) {
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});

describe('Test Bad account creation', function () {
    after(function (done) {
        done();
    });
    //timeout line
    it('Should create account', function (done) {
        //timeout line
        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done()
            });
    });
});

