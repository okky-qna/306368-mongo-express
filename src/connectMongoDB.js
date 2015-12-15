var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

module.exports = function connectMongoDB(app, callback) {
  MongoClient.connect('mongodb://localhost:27017/ids', function (err, db) {
    if (err) {
      callback(err);
      return;
    }

    // Register MongoDB middleware
    app.use(function mongoDBMiddleware(req, res, next) {
      req.db = db;
      next();
    });

    callback();
  });
};
