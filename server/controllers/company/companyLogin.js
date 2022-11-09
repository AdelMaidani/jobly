const company = require("../../models/company");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = companyLogin = async (req, res) => {
  const user = await company.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("email doesn't exist");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Password");

  const token = jwt.sign({ _id: user._id, type: "company" }, process.env.TOKEN);
  res.send(JSON.stringify(token));
};