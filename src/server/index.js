const express = require("express");
const app = express();
const router = express.Router();

router.route("/").get((req, res) => res.json({ message: "ok" }));

app.use(router);

app.listen(80, () => console.log("Listening on 80"));
