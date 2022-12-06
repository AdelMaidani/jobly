const company = require("../../models/company");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const companyLogin = async (req, res) => {
  const user = await company.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("email doesn't exist");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Password");

  const token = jwt.sign(
    { _id: user._id, type: "Employer" },
    process.env.TOKEN
  );
  res.cookie("Jobly", token, { httpOnly: true, path: "/" });
  res.send("logged in");
};

const companyLogout = (req, res) => {
  res.clearCookie("Jobly").sendStatus(200);
};

module.exports = { companyLogin, companyLogout };
