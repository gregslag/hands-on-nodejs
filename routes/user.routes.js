const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");

router.post("/", function(req, res) {
  UserController.insertUser(req, res);
});

router.get("/", function(req, res) {
  UserController.getAllUsers(req, res);
});

router.get("/:id", function(req, res) {
  UserController.getUserById(req, res);
});

module.exports = router;