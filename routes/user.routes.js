const express = require("express");
const router = express.Router();

const multer = require("multer");
const multerConfig = require("../config/multer");

const UserController = require("../controllers/user.controller");

router.post("/", function(req, res) {
  UserController.insertUser(req, res);
});

router.patch("/:id/image", multer(multerConfig).single('file'), function (req, res) {
  UserController.updateUserImage(req, res);
});

router.get("/", function(req, res) {
  UserController.getAllUsers(req, res);
});

router.get("/:id", function(req, res) {
  UserController.getUserById(req, res);
});

router.put("/:id", function(req, res) {
  UserController.updateUser(req, res);
});

router.delete("/:id", function(req, res) {
  UserController.deleteUser(req, res);
});

module.exports = router;