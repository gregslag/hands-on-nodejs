const UserDAO = require("../db/user.dao");
const UserModel = require("../model/user.model");

class UserController {
  constructor() {
    this.userDAO = new UserDAO();
  }

  insertUser(req, res) {
    //const user = req.body.user;
    const { user } = req.body;

    try {
      const id = this.userDAO.generateId();

      const userModel = new UserModel({ id, ...user });

      const newUser = this.userDAO.insert(userModel);

      res.send({ success: true, user: newUser });
    } catch (error) {
      res.status(400).send({ success: false, error: "Ops! Ocorreu um erro" });
    }
  }
}

module.exports = new UserController();
