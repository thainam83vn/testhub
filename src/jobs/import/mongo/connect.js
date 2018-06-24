const MongoClient = require("mongodb").MongoClient;

const mongo = {};
mongo.db = null;
mongo.connect = url => {
  return new Promise((resolve, reject) => {
    if (!mongo.db) {
      MongoClient.connect(url, function(err, db) {
        if (err) return reject(err);
        console.log("Database created!");
        mongo.db = db;
        resolve(mongo.db);
      });
    } else {
      resolve(mongo.db);
    }
  });
};

module.exports = mongo;
