const expect = require('chai').expect;
const assert = require('chai').assert;
var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
const output = require('../webpage/js/code').display_output;
const input = require('../webpage/js/code').get_input;
// const isPrime = require('../webpage/js/code').isPrime;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const resourceLoader = new jsdom.ResourceLoader({
    resources:"usable",
    script:"usable",
    runScripts:"dangerously",
    frame:"usable",
    iframe: "usable",
});
const dom = new JSDOM(`<!DOCTYPE html>
<body onload = "display_output(get_input())">
    <main>
        <textarea type="text" name="data" id="input" onkeyup="display_output(get_input())" placeholder="Start HTML Coding Here">"Hello"</textarea>
                <textarea2 type="text" name="cssdata" id="input2" onkeyup="display_output(get_input())" placeholder="Start CSS Coding Here">"Hello 2"</textarea2>
 <iframe id="output" scrolling="yes">
        </iframe>
        <section>
            <input type="submit" value="Submit">
        </section>
    </main>
</body>
<script src="js/code.js"></script>
`,{resources:resourceLoader}).window;

describe('Testing get_input is reachable', function(){

    it('display_input()', function(done){
        expect(input, undefined);
        done()
    });
});

describe('Testing display_out is reachable', function(){
    it('display_output()', function(done){
        expect(output, undefined);
        done()
    });
});

describe('Testing HTML Text has text in it', function(){
    it('display_output()', function(done){
        var z =(dom.window.document.querySelector("textarea").textContent);
        var str = "\"Hello\"";
        assert.equal(z,str);
        done()
    });
});

describe('Testing CSS Text has text in it', function(){
    it('display_output()', function(done){
        var x =(dom.window.document.querySelector("textarea2").textContent);
        var str = "\"Hello 2\"";
        assert.equal(x,str);
        done()
    });
});

describe('Testing the empty iFrame loaded properly', function(){
    it('display_output(get_input())', function(done){
        //Allows for scripts to run in our mock and allows for modifying of the DOM
        dom.window.document.body.children.length === 2;
        var x = JSON.stringify(dom.window.output)
        var str = "{}";
        assert.equal(x, str)
        done()
    });
});

describe('Testing the iFrame loaded properly with content', function(){
    it('display_output(get_input())', function(done){
        dom.window.document.body.children.length === 2;
        var x = JSON.stringify(dom.window.output)
        var str = "{}";
        assert.equal(x, str)
        done()
    });
});
//APPEND STUFF, PLEASE FIGURE IT OUT


//////////////////////
// describe('Testing get_input', function(){
//     console.log(input)
//     it('display_input()', function(done){
//         console.log(input)
//          expect(input, undefined);
//             done()
//     });
// });





// //---Powerpoint Testers from the lecture--//
// describe('Testing isPrime', function(){
//     it('isPrime()',function(done){
//       assert.equal(isPrime(5),true);
//       done()
//     });
// });

//---This fails--//
// describe('Fail Testing isPrime', function(){
//     it('isPrime()',function(done){
//         assert.equal(isPrime(5),false);
//         done()
//     });
// });



