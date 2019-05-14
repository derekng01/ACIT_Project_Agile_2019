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
    this.timeout(10000);

    it("Should return '404' ", function (done) {
        //timeout line
        wait(3000)

        chai.request(app)
            .get('/12345')
            .end(function(err, res) {
                expect(res).to.have.status(404);
                done()
            });
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

            });
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
    after(function (done) {
        done();
    });

    it("Should return 'Code-Save Page' ", function (done) {
        chai.request(app)
            .post('/code-save')
            .end(function(err, res) {
                console.log(res.text)
                //console.log(res.text);
                expect(res).to.have.status(500);
                done()

            });
    });
});

var agent = chai.request.agent(app);

describe('Test account creation', function () {
    after(function (done) {
        done();
    });

    it('Should create account', function (done) {
        agent
            .post('/register')
            .type('form')
            .send({username: 'test',email: 'test@test', password: 'test', phone:'+17786289389'})
            .then(function (res) {
                // console.log(res)

                var str = res.text;
                var patt= /Thank You For Registering!/i;
                var resu = patt.test(str);
                assert.equal(resu,true);

                //console.log(res.text)
                // expect(res).to.have.status(200);
                //   done()
                done()

            });
    })
})

