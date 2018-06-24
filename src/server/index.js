const cwd = process.cwd();
const mapper = require("rest-mongo-mapper");
const logger = require("./helpers/logger");
const express = require("express");
const app = express();
// app.use((err, req, res, next) => {
//   console.log(err);
//   logger.log({ level: "error", err });
// });
const router = express.Router();
require(`${cwd}/helpers/mongoose.js`)().then(mongo => {
  router.route("/").get((req, res) => res.json({ message: "ok" }));
  mapper(
    {
      exams: require("./models/exams"),
      questions: require("./models/questions")
    },
    router
  );
  app.use(router);
  app.listen(5000, () => console.log("Listening on 5000"));
});
