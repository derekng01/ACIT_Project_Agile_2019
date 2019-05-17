const MongoClient = require('mongodb').MongoClient;
    const db_uri = "mongodb+srv://nodeagilefinal:nodeagilefinal@codedatabase-vvcrh.mongodb.net/CodeDatabase"
var _db = null;

module.exports.getDb = () => {
    return _db;
};

module.exports.init = function() {
    MongoClient.connect(db_uri, { useNewUrlParser: true }, (err, client) => {

        // MongoClient.connect('mongodb://localhost:27017', (err, client) => {
        if (err) {
            return console.log('Unable to connect to DB')
        }
            _db = client.db('CodeDatabase');
            console.log('Successfully connected to MongoDB server')
    });
};

