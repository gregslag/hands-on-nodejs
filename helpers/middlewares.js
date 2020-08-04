function checkUserFields(req, res, next) {
  const { name, register, course } = req.body.user;
  if (name && register && course) {
    return next();
  }

  return res.status(400).json({ message: "Ops! Parece que está faltando algum campo" });
}
module.exports = {
  checkUserFields
};
