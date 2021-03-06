const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const utils = require('./utils.js');
var session = require('express-session');
var exphbs = require('express-handlebars');

//Insert MessageBird API Key in the bracket    ↓↓↓↓↓ HERE ↓↓↓↓↓
var messagebird = require('messagebird')('z98qoGoJTwAXOqgr3dHhVbaEM');
//Insert MessageBird API Key in the bracket    ↑↑↑↑↑ HERE ↑↑↑↑↑

var app = express();

const port = process.env.PORT || 8080;

utils.init()

// Cookie Code
// Ignore this line underneath I just copied it from a website LOL
app.use(session({secret: 'XASDASDA'}));
var ssn ;
// Cookie Code

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Partialsclear
hbs.registerPartials(__dirname + '/partials');

app.set('views', __dirname + '/webpage');

//don't know if we really need this.
app.set('view engine', 'hbs');

// Web Pages
app.use(express.static(__dirname + '/webpage'));

// --------------- Home Page  --------------- //
app.get('/', (request, response) => {

    ssn=request.session;
    ssn.username = undefined;
    ssn.verification = 0;
    response.render('index.hbs', {
        title: "Home Page",
        header: "Welcome to Home!",
    });
     ssn.comport;
     ssn.command;
});

//------------Registration Form-------------//
app.post('/register', function (request, response) {
    var db = utils.getDb();
    request.body["data"] = "";
    request.body["cssdata"] = "";
    request.body["jsdata"] = "";
    db.collection('users').insertOne(request.body);
    response.render('index.hbs', {
        success_register: 'Thank You for Registering!'
    });
});

// //Set up and configure the Express framework
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//2-step
app.post('/login', (request, response) => {
    ssn = request.session;
    var db = utils.getDb();
    db.collection('users').find(request.body).toArray((err, result) => {
        if (result.length === 0) {
            response.render('index.hbs', {
                success_login: 'Invalid Login Info!'
            })
        } else {
            ssn.username=request.body.username;
            ssn.password=request.body.password;
            // console.log(ssn.password);

            db.collection('users').find({username: ssn.username}).toArray((err, items) => {
                //console.log(items);
                data = items[0]["phone"];
                // console.log(data);

                response.render('step1.hbs',{
                    number: data
                })

            });
        }
    });
});

//-------------Step 2 for Verification--------------------//
// Handle phone number submission
app.post('/step2', function(req, res) {
    var number = req.body.number;
    // var user_name = req.params.name;

//     //Make request to verify API
    messagebird.verify.create(number, {
        template: "Your verification code is %token."
    },function (err, response) {
        if(err) {
            //Request has failed
            console.log(err);
            res.render(`step1.hbs`,{
                error: err.errors[0].description,
                // username: user_name
            });
        }
        else{
            //Request succeeds
           // console.log(response);
            res.render(`step2.hbs`,{
                id: response.id,
                // username: user_name
            });
        }
    })
});

//-------------Step 3 for Verification--------------------//
app.post('/step3', function(req, res) {
    var id = req.body.id;
    var token = req.body.token;
    // var user_name = req.params.name;

//     //Make request to verify API
    messagebird.verify.verify(id, token, function(err, response ) {
        //console.log(response);
        if((err)) {
            //Verification has failed
            res.render('step1.hbs', {
                error: err.errors[0].description,
                id: id
            })
        }
        else if(token===''){
            res.render('step1.hbs',{
                number: data
            })
        }
        else {
            ssn.verification = 1;
            //Verification was succe${username}
            // res.redirect(`/home/${user_name}`);
            res.redirect('/code')
        }

    })
});



// --------------- Code Page --------------- //
app.get('/code', (request, response) => {
    var db = utils.getDb();
    if (ssn.username === undefined ) {
        response.render('index.hbs', {
            success_login: 'Please Login First!'
        })
    } else if(ssn.verification !==1){
        response.render('step1.hbs', {
        })

    }else {
        db.collection('users').find({username: ssn.username}).toArray((err, items) => {
            //console.log(items);
            data = items[0]["data"];
            cssdata = items[0]["cssdata"];
            jsdata = items[0]["jsdata"];

            response.render('code.hbs', {
                title: 'Code Page',
                header: "This is about me!",
                username: ssn.username,
                data: data,
                cssdata: cssdata

            });
        });
    }
});
//--------Code page which saves the data ----------//
app.post('/code-save', (request, response) => {
    var db = utils.getDb();

    username = request.body.username;
    //console.log(username);

    data = request.body.data;
    cssdata = request.body.cssdata;

    //console.log(data);

    db.collection('users').findOneAndUpdate({username: username}, {'$set': {'data': data}}, (err, item) => {
        //console.log(data)
    });
    db.collection('users').findOneAndUpdate({username: username}, {'$set': {'cssdata': cssdata}}, (err, item) => {
        //console.log(item)
    });
    db.collection('users').findOneAndUpdate({username: username}, {'$set': {'jsdata': jsdata}}, (err, item) => {
        //console.log(item)
    });

    response.render('code.hbs', {
        title: 'Code Page',
        success: "File Has Been Saved",
        header: "This is about me!",
        username: ssn.username,
        data: data,
        cssdata:cssdata,
        jsdata: jsdata,
    });
});

const fs = require("fs");

app.post('/test-save', (request, response) => {
    json = request.body;

    //console.log(json);
    //console.log(typeof json);

    response.render('test.hbs');
    fs.writeFile("test.json", json, (err) => {
        if (err) console.log(err);
    })
});

app.get('/test' , (request, response) => {
    response.render('test.hbs')
});

app.get("*", (request, response) => {
    response.status(400);
    response.render("404.hbs", {
    });
});

app.get('/logout', (request, response) => {
    javascript:void(0);
    request.logout();
    request.session.destroy(() => {
        response.clearCookie('connect.sid');
        response.redirect('/');
    });
});

app.listen(port, () => {
    console.log('Server is up and running');
    utils.init()
});

module.exports = app;