const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");

router.post("/", function(req, res) {
  UserController.insertUser(req, res);
});

module.exports = router;