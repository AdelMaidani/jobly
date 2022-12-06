const router = require("express").Router();
const {
  companyData,
  companies,
  CompanyDescription,
  companyJobs,
} = require("../controllers/company/companyData");
const {
  companyLogin,
  companyLogout,
} = require("../controllers/company/companyLogin");
const companyRegister = require("../controllers/company/companyRegister");
const {
  editCompanyName,
  editCompanyAddress,
  editCompanyCountry,
  editCompanyEmail,
  editCompanyLinkedin,
  editCompanyMobileNumber,
  editCompanyAboutTheCompany,
} = require("../controllers/company/updateData");
const {
  search,
  searchByCompany,
  searchByPlace,
} = require("../controllers/company/search");

router.post("/register", companyRegister);
router.post("/login", companyLogin);
router.get("/logout", companyLogout);
router.post("/data", companyData);
router.get("/companies", companies);
router.post("/CompanyDescription", CompanyDescription);
router.post("/personDashboardCOJobs", companyJobs);
router.get("/searchbycompany", searchByCompany);
router.get("/searchbyplace", searchByPlace);

// Update Company Info Routes
router.post("/editCompanyData/companyName", editCompanyName);
router.post("/editCompanyData/address", editCompanyAddress);
router.post("/editCompanyData/country", editCompanyCountry);
router.post("/editCompanyData/email", editCompanyEmail);
router.post("/editCompanyData/linkedin", editCompanyLinkedin);
router.post("/editCompanyData/mobelNumber", editCompanyMobileNumber);
router.post("/editCompanyData/aboutTheCompany", editCompanyAboutTheCompany);

module.exports = router;
