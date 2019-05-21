const MongoClient = require('mongodb').MongoClient;
                //↓↓↓↓↓ HERE ↓↓↓↓↓ Insert MongoDB API Key in the quotations
    const db_uri = ""
                //↑↑↑↑↑ HERE ↑↑↑↑↑ Insert MessageBird API Key in the quotations
var _db = null;

module.exports.getDb = () => {
    return _db;
};



module.exports.init = function() {
    //--------------------------- UNCOMMENT THIS LINE ↓↓↓↓↓ HERE ↓↓↓↓↓------------------------------------//
        // MongoClient.connect(db_uri, { useNewUrlParser: true }, (err, client) => {
    //----------------------------UNCOMMENT THIS LINE ↑↑↑↑↑ HERE ↑↑↑↑↑-----------------------------------//
    //=======================================================================================================================================//
    //---------------------------COMMENT THIS LINE ↓↓↓↓↓ HERE ↓↓↓↓↓-------------------------------------//
        MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    //---------------------------COMMENT THIS LINE ↑↑↑↑↑ HERE ↑↑↑↑↑-------------------------------------//

        if (err) {
            return console.log('Unable to connect to DB')
        }
            _db = client.db('CodeDatabase');
            console.log('Successfully connected to MongoDB server')
    });
};

