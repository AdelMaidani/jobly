const person = require("../../models/person");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = personLogin = async (req, res) => {
  const user = await person.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("email doesn't exist");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Password");

  const token = jwt.sign({ _id: user._id, type: "person" }, process.env.TOKEN);
  res.send(JSON.stringify(token));
};
