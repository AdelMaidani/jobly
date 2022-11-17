const company = require("../../models/company");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = companyRegister = async (req, res) => {
  const emailExist = await company.findOne({
    email: req.body.email.toLowerCase(),
  });
  if (emailExist) return res.status(400).send("email already exist");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new company({
    companyName: req.body.companyName,
    email: req.body.email.toLowerCase(),
    mobileNumber: req.body.mobileNumber,
    password: hashedPassword,
    website: req.body.website,
    linkedin: req.body.linkedin,
    aboutTheCompany: req.body.aboutTheCompany,
    address: req.body.address,
    companyLogo: req.body.companyLogo,
    country: req.body.country,
  });
  try {
    const savedUser = await user.save();
    const token = jwt.sign(
      { _id: savedUser._id, type: "company" },
      process.env.TOKEN
    );
    res.cookie("Jobly", token, { httpOnly: true, path: "/" });
    res.send("logged in");
  } catch (err) {
    res.status(400).send(err);
  }
};
