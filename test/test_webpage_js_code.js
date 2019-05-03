const expect = require('chai').expect;
const output = require('../webpage/js/code').display_output;
const input = require('../webpage/js/code').get_input;


describe('Testing get_input', function(){
    it('get_input()', function(){
        expect(input, undefined);
    });
});

describe('Testing display_out', function(){
    it('display_output()', function(){
        expect(output, undefined);
    });
});