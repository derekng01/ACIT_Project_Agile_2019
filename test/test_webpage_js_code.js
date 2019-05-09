const expect = require('chai').expect;
const assert = require('chai').assert;
var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const output = require('../webpage/js/code').display_output;
const input = require('../webpage/js/code').get_input;
// const isPrime = require('../webpage/js/code').isPrime;


const dom = new JSDOM(`<!DOCTYPE html><p>"Hello world"</p>`);
var z =(dom.window.document.querySelector("p").textContent); // "Hello world"
console.log(z)

describe('Test',function(){
    assert.equal(z, "Hello world");
    dont
})
//
// const document = new JSDOM(`<!DOCTYPE html>
// <body onload = "display_output(get_input())">
//
//     <main>
//         <textarea type="text" name="data" id="input" onkeyup="display_output(get_input())" placeholder="Start HTML Coding Here">"Hello"</textarea>
//                 <textarea type="text" name="cssdata" id="input2" onkeyup="display_output(get_input())" placeholder="Start CSS Coding Here">"Hello 2"</textarea>
//  <iframe id="output" scrolling="yes">
//         </iframe>
//         <section>
//             <input type="submit" value="Submit">
//         </section>
//     </main>
// </body>
// <script src="js/code.js"></script>
// `);

describe('Testing get_input', function(){

    it('display_input()', function(done){
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

// var agent = chai.request.agent(document);
// var input = require('../test/test_webpage_js_code').document.get_input();
// describe('Testing get_input', function(){
//     console.log(input)
//     it('display_input()', function(done){
//         console.log(input)
//          expect(input, undefined);
//             done()
//     });
// });
//
// //
// JSDOM.fromFile("../webpage/code.hbs").then(dom=>{
//     console.log(dom.serialize());
// })
//






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



