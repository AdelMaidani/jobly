const person = require("../../models/person");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = registerPerson = async (req, res) => {
  const emailExist = await person.findOne({ email: req.body.email });
  if (emailExist) return res.status(200).send("email already exist");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new person({
    fullName: req.body.fullName,
    email: req.body.email.toLowerCase(),
    password: hashedPassword,
    skills: req.body.skills,
    portfolioWebsite: req.body.portfolioWebsite,
    address: req.body.address,
    country: req.body.country,
    mobileNumber: req.body.mobileNumber,
    profilePicture: req.body.profilePicture,
    acceptedJobs: Array,
    rejectedJobs: Array,
    jobs: Array,
    pendingForReview: Array,
  });
  try {
    const savedUser = await user.save();
    const token = jwt.sign(
      { _id: savedUser._id, type: "person" },
      process.env.TOKEN
    );
    res.cookie("Jobly", token, { httpOnly: true, path: "/" });
    res.send("logged in");
  } catch (err) {
    res.status(400).send(err);
  }
};
