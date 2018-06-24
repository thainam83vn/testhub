module.exports = async (url, dbname) => {
  const connect = require("./connect");
  const db = await connect.connect(
    url,
    dbname
  );
  const dbo = db.db(dbname);
  const mongo = {};
  mongo.close = () => db.close();
  // const db = () => await connect.connect(url);
  mongo.dbo = () => dbo;
  mongo.createCollection = collection => {
    return new Promise((resolve, reject) => {
      dbo.createCollection(collection, function(err, res) {
        if (err) return reject(err);
        resolve(res);
      });
    });
  };
  mongo.insertOne = (collection, obj) => {
    // console.log(`insert ${obj.title}`);
    return new Promise((resolve, reject) => {
      dbo.collection(collection).insert(obj, function(err, res) {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  };

  return mongo;
};
