const MongoClient = require('mongodb').MongoClient;
const dbiuri = "mongodb+srv://nodeagilefinal:nodeagilefinal@codedatabase-vvcrh.mongodb.net/CodeDatabase"
var _db = null;

module.exports.getDb = () => {
    return _db;
};

module.exports.init = function(callback) {
    MongoClient.connect(dbiuri, (err, client) => {

        // MongoClient.connect('mongodb://localhost:27017', (err, client) => {
        if (err) {
            return console.log('Unable to connect to DB')
        }
        _db = client.db('CodeDatabase');
        //console.log('Successfully connected to MongoDB server');
    });
};