class UserModel {
  constructor({
    id,
    name,
    register,
    course,
    birthDate,
    cep,
    address,
    number,
    address_detail,
    district,
    status,
    image,
  }) {
    this.id = id;
    this.name = name;
    this.register = register;
    this.course = course;
    this.birthDate = birthDate;
    this.cep = cep;
    this.address = address;
    this.number = number;
    this.address_detail = address_detail;
    this.district = district;
    this.status = status;
    this.image = image;
  }
}

// class User {
//   constructor(...user) {
//     Object.assign(this, user);
//   }
// }

module.exports = UserModel;
