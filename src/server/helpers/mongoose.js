const mongoose = require("mongoose");
const env = require(`${process.cwd()}/helpers/env`);
module.exports = () => {
  return new Promise((resolve, reject) => {
    try {
      const result = mongoose.connect(env.mongoUri);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};
