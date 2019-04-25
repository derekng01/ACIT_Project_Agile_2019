const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const utils = require('./utils.js');
var session = require('express-session');

var app = express();

const port = process.env.PORT || 8080;


// Cookie Code
// Ignore this line underneathb I just copied it from a website LOL
app.use(session({secret: 'XASDASDA'}));
var ssn ;
// Cookie Code  


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Partialsclear
hbs.registerPartials(__dirname + '/partials');

app.set('views', __dirname + '/Web Page');
app.set('view engine', 'hbs');

// Web Pages
app.use(express.static(__dirname + '/Web Page'));

// --------------- index page  --------------- //
app.get('/', (request, response) => {
    ssn=request.session;
    ssn.username = undefined;
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
    db.collection('users').insertOne(request.body);
    response.render('index.hbs', {
        success_register: 'Thank You for Registering!'
    });
});
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
            db.collection('users').find({username: ssn.username}).toArray((err, items) => {
                console.log(items);
                data = items[0]["data"];
                response.render('code.hbs', {
                    title: 'Code Page',
                    header: "This is about me!",
                    username: ssn.username,
                    data: data
                });
            });
        

            
        }
    });
});
// --------------- index page  --------------- //



// --------------- code page  --------------- //
app.get('/code', (request, response) => {
    var db = utils.getDb();
    if (ssn.username === undefined) {
        response.render('index.hbs', {
            success_login: 'Please Login First!'
        })
    } else {
        db.collection('users').find({username: ssn.username}).toArray((err, items) => {
            console.log(items);
            data = items[0]["data"];
            response.render('code.hbs', {
                title: 'Code Page',
                header: "This is about me!",
                username: ssn.username,
                data: data
            });
        });
    }
});

app.post('/code-save', (request, response) => {
    var db = utils.getDb();

    username = request.body.username;
    console.log(username);

    data = request.body.data;
    console.log(data);

    db.collection('users').findOneAndUpdate({username: username}, {'$set': {'data': data}}, (err, item) => {
        console.log(item)
    });
    response.render('code.hbs', {
        title: 'Code Page',
        success: "File Has Been Saved",
        header: "This is about me!",
        username: ssn.username,
        data: data
    });
});

// --------------- code page  --------------- //
const fs = require("fs");

app.post('/test-save', (request, response) => {
    json = request.body

    console.log(json);
    console.log(typeof json);

    response.render('test.hbs');
    fs.writeFile("test.json", json, (err) => {
        if (err) console.log(err);
    })
})

app.get('/test' , (request, response) => {
    response.render('test.hbs')
})


app.listen(port, () => {
    console.log('Server is up and running');
    utils.init()
});




