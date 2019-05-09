const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const utils = require('./utils.js');
var session = require('express-session');
const MongoClient = require('mongodb').MongoClient;

var exphbs = require('express-handlebars');

//CHANGE THE SECOND BRACKET WITH A NEW API KEY WHEN THINGS BREAK
var messagebird = require('messagebird')('z98qoGoJTwAXOqgr3dHhVbaEM');

var app = express();

const port = process.env.PORT || 8080;


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



// --------------- index page  --------------- //
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
app.post('/register', function (request, response) {
    var db = utils.getDb();
    request.body["data"] = "";
    request.body["cssdata"] = "";
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

// --------------- index page  --------------- //

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

// //Verify whether the token is correct

app.post('/step3', function(req, res) {
    var id = req.body.id;
    var token = req.body.token;
    // var user_name = req.params.name;

//     //Make request to verify API
    messagebird.verify.verify(id, token, function(err, response ) {
        console.log(response);
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



// --------------- code page  --------------- //
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

    response.render('code.hbs', {
        title: 'Code Page',
        success: "File Has Been Saved",
        header: "This is about me!",
        username: ssn.username,
        data: data,
        cssdata:cssdata
    });
});

// --------------- code page  --------------- //
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

app.listen(port, () => {
    console.log('Server is up and running');
    utils.init()
});




module.exports = app;