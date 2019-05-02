const assert = require('chai').assert;
const app = require('../webpage/js/code').display_code;
const nock = require('nock');

describe('Code Viewer', function(){
        it('String input', function(){
            assert.equal(app,undefined);
        });
});


