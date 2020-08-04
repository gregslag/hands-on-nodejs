const fs = require("fs-extra");
const path = require("path");

class UserDAO {
  constructor() {
    this.pathUsers = path.resolve(__dirname, "users.json");
  }

  generateId() {
    const users = this.getAll();

    const id =
      (users.length
        ? Math.max.apply(
            Math,
            users.map(function (u) {
              return parseInt(u.id);
            })
          )
        : 0) + 1;

    return id;
  }

  insert(user) {
    const users = this.getAll();

    const newUsersList = [...users, user];

    fs.outputJsonSync(this.pathUsers, newUsersList);

    return user;
  }

  getById(id) {
    const user = this.getAll().find((u) => u.id == id);

    return user;
  }

  getAll() {
    const users = fs.pathExistsSync(this.pathUsers)
      ? fs.readJsonSync(this.pathUsers)
      : [];
    return users;
  }

  update(id, user) {
    const users = this.getAll();

    const newUsers = users.map((u) => (u.id == id ? { ...u, ...user } : u));

    const userUpdated = newUsers.find((u) => u.id == id);

    fs.outputJsonSync(this.pathUsers, newUsers);

    return userUpdated;
  }

  delete(id) {
    const users = this.getAll();

    const newUsers = users.filter((u) => u.id != id);
    fs.outputJsonSync(this.pathUsers, newUsers);

    return newUsers;
  }
}

module.exports = UserDAO;
