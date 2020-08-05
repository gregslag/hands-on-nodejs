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

  getAllUsers(req, res) {
    try {
      const users = this.userDAO.getAll();

      const { name_like, status_like, course_like } = req.query;
      const filteredUsers = users.filter(u => {
        let cond = true;
        if (name_like) {
          cond = cond && u.name && u.name.toLowerCase().indexOf(name_like.toLowerCase()) >= 0;
        }
        if (status_like) {
          cond = cond && JSON.parse(status_like) === u.status
        }
        if (course_like) {
          cond = cond && u.course && course_like.toLowerCase() === u.course.toLowerCase();
        }

        return cond
      })

      res.send({ success: true, users: filteredUsers });
    } catch (error) {
      res.status(400).send({ success: false, error: "Ops! Ocorreu um erro" });
    }
  }

  updateUserImage(req, res) {
    try {
      const { id } = req.params;
      const { key } = req.file;

      const userToBeUpdated = this.userDAO.getById(id);

      // const userModel = new UserModel(Object.assign(userToBeUpdated, { image: `http://localhost:3001/files/${key}` }));
      const userModel = new UserModel({
        ...userToBeUpdated,
        image: `http://localhost:3001/files/${key}`,
      });

      const userUpdated = this.userDAO.update(id, userModel);

      res.send({ success: true, user: userUpdated });
    } catch (error) {
      console.log("[UserController] error in updateUserImage >> ", error);

      return res
        .status(400)
        .send({ success: false, error: "Ops! Ocorreu um erro" });
    }
  }

  getUserById(req, res) {
    const { id } = req.params;

    try {
      const user = this.userDAO.getById(id);

      res.send({ success: true, user });
    } catch (error) {
      res.status(400).send({ success: false, error: "Ops! Ocorreu um erro" });
    }
  }

  updateUser(req, res) {
    const { id } = req.params;
    const { user } = req.body;

    try {
      const userToUpdate = this.userDAO.getById(id);

      const userModel = new UserModel(Object.assign(userToUpdate, user));
      // const userModel = new UserModel({ ...userToUpdate, ...user });

      const userUpdated = this.userDAO.update(id, userModel);

      res.send({ success: true, user: userUpdated });
    } catch (error) {
      res.status(400).send({ success: false, error: "Ops! Ocorreu um erro" });
    }
  }

  deleteUser(req, res) {
    const { id } = req.params;

    try {
      this.userDAO.delete(id);

      res.send({ success: true });
    } catch (error) {
      res.status(400).send({ success: false, error: "Ops! Ocorreu um erro" });
    }
  }
}

module.exports = new UserController();
