const express = require("express");

const router = express.Router();

router.get("/", function (request, response) {
  response.json({ message: "Hello world!" });
});

router.use("/api/v1/user", require("./user.routes"));

module.exports = router;
