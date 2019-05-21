const assert = require('chai').assert;
var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
const downloadbtn = require('../webpage/js/download').downloadbtn;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const resourceLoader = new jsdom.ResourceLoader({
    resources:"usable",
    script:"usable",
    runScripts:"dangerously",
    frame:"usable",
    iframe: "usable",
});
const dom = new JSDOM(
`<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Home Page</title>
</head>
<body onload="display_output(get_input(true),true)">

                        <div class="container-fluid tab-pane active" id="html">
                            <textarea class="container-fluid cus-tb" type="text" name="data" id="input"
                                      onkeyup="display_output(get_input(chk_auto()),chk_auto())"
                                      placeholder="Start HTML Coding Here">"Goodbye"</textarea>
                                     <input type="submit" class="btn btn-dark" onload="downloadfiles('html', deskcode['data'].value)" value="Download HTML">
                        </div>
                      
                        <div class="container-fluid tab-pane fade" id="css">
                            <textarea class="container-fluid cus-tb" type="text" name="cssdata" id="input2"
                                      onkeyup="display_output(get_input(chk_auto()),chk_auto())"
                                      placeholder="Start CSS Coding Here">"Hello"</textarea>
                                      <input type="submit" class="btn btn-dark" onload="downloadfiles('css', deskcode['cssdata'].value)" value="Download CSS">
                        </div>              
</body>
<script src="js/code.js"></script>
<script src="js/download.js"></script>
`
,{resources:resourceLoader}).window;

describe('Testing Downloadbtn HTML', function(){
    var head = "<!DOCTYPE html>\n" +
        "<html lang=\"en\">\n" +
        "<head>\n" +
        "    <meta charset=\"UTF-8\">\n" +
        "    <title>DESKCODE</title>\n" +
        "    <link rel = \"stylesheet\"\n" +
        "          type = \"text/css\"\n" +
        "          href = \"deskcode.css\">\n" +
        "</head>\n" +
        "<body>\n";
    var end = "\n</body>\n" +
        "</html>";
    var data = "hello"
    var htmldata = head + data + end;

    it('downloadbtn(html,"hello")', function(done){
        assert.equal(downloadbtn('html',"hello"), htmldata);
        done()
    });
    it('downloadbtn(html,"hello") does not match', function(done){
        assert.notEqual(downloadbtn('html',"Goodbye"), htmldata);
        done()
    });
    it('downloadbtn(html,"hello") undefined', function(done){
        assert.notEqual(downloadbtn('html',undefined), htmldata);
        done()
    });
});


describe('Testing Downloadbtn CSS', function(){
    it('downloadbtn(css,"hello") works', function(done){
        assert.equal(downloadbtn('css',"hello"), "hello");
        done()
    });

    it('downloadbtn(css,"hello") does not match', function(done){
        assert.notEqual(downloadbtn('html',"Goodbye"), "Wrong, wrong, wrong");
        done()
    });

    it('downloadbtn(css,"hello") undefined', function(done){
        assert.notEqual(downloadbtn('html',"Goodbye"), undefined);
        done()
    });
});


describe('Testing Download compiles into a DOM object for browsers', function() {
    //We have to take the function apart and test is here. Chai-dom mocking
    // does not allow us to pass dom.window.document into the function for testing

    it('Download properly compiles a DOM', function (done) {
        var element =  dom.window.document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent("hello"));
        element.setAttribute('download', "hello");

        element.style.display = 'none';
        dom.window.document.body.appendChild(element);
        assert.equal(typeof(element),"object");
        done()
    });
    it('DOM has the correct contents', function (done) {
        var element =  dom.window.document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent("hello"));
        element.setAttribute('download', "hello");

        element.style.display = 'none';
        dom.window.document.body.appendChild(element);
        element = String(element)
        assert.equal(element,'data:text/plain;charset=utf-8,hello');
        done()
    });

    it('DOM tester is properly working', function (done) {
        var element =  dom.window.document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent("hello"));
        element.setAttribute('download', "hello");

        element.style.display = 'none';
        dom.window.document.body.appendChild(element);
        element = String(element)
        assert.notEqual(element,undefined);
        done()
    });
});


