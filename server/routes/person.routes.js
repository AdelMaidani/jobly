const personRegister = require("../controllers/person/personRegister");
const personLogin = require("../controllers/person/personLogin");
const { personData } = require("../controllers/person/personData");
const {
  editAddress,
  editCountry,
  editEmail,
  editFullName,
  editLinkedin,
  editSkills,
} = require("../controllers/person/updateData");

const router = require("express").Router();

router.post("/register", personRegister);
router.post("/login", personLogin);
router.post("/personData", personData);

// Update Person Info

router.post("/editPersondata/Address", editAddress);
router.post("/editPersondata/country", editCountry);
router.post("/editPersondata/email", editEmail);
router.post("/editPersondata/fullname", editFullName);
router.post("/editPersondata/linkedin", editLinkedin);
router.post("/editPersondata/skills", editSkills);

module.exports = router;
