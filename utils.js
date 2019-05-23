const MongoClient = require('mongodb').MongoClient;
                //Insert MongoDB Atlas Key ↓↓↓↓↓ HERE ↓↓↓↓↓
    const db_uri = "mongodb+srv://nodeagilefinal:nodeagilefinal@codedatabase-vvcrh.mongodb.net/CodeDatabase"
                //Insert MongoDB Atlas Key ↑↑↑↑↑ HERE ↑↑↑↑↑
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

