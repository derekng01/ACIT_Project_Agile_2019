const request = require('supertest');
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
    //timeout line
    this.timeout(10000);

    it("Should return '404' ", function (done) {
        //timeout line
        wait(3000)

        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(404);
                done()
            })
    });
});

//Testing Home Page
describe('GET /', function () {
    it("Should return 'Home Page' ", function (done) {
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done()
            })
    });
});

//Testing Coding page
describe('GET /code', function () {
    it("Should return 'Code Page' ", function (done) {
        chai.request(app)
            .get('/code')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done()
            })
    });
});

//Testing Code-Save renders
describe('POST /code-save', function () {
    it("Should return 'Code-Save Page' ", function (done) {
        chai.request(app)
            .post('/code-save')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done()
            })
    });
});