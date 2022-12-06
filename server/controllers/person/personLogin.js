const person = require("../../models/person");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const personLogin = async (req, res) => {
  const user = await person.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("email doesn't exist");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Password");

  const token = jwt.sign({ _id: user._id, type: "person" }, process.env.TOKEN);
  res.cookie("Jobly", token, { httpOnly: true, path: "/" });
  res.send("logged in");
};

const personLogout = (req, res) => {
  res.clearCookie("Jobly").sendStatus(200);
};

module.exports = { personLogin, personLogout };
