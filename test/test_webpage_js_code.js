const expect = require('chai').expect;
const assert = require('chai').assert;
var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);

const output = require('../webpage/js/code').display_output;
const input = require('../webpage/js/code').get_input;
const isPrime = require('../webpage/js/code').isPrime;


describe('Testing get_input', function(){
    it('display_output()', function(done){
        expect(input, undefined);
        done()
    });
});

describe('Testing display_out', function(){
    it('display_output()', function(done){
        expect(output, undefined);
        done()
    });
});




describe('Testing isPrime', function(){
    it('isPrime()',function(done){
      assert.equal(isPrime(5),true);
      done()
    });
});

//---This fails--//
// describe('Fail Testing isPrime', function(){
//     it('isPrime()',function(done){
//         assert.equal(isPrime(5),false);
//         done()
//     });
// });