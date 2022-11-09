const router = require("express").Router();
const {
  acceptApplicant,
  rejectApplicant,
  checkIfAppliedCompany,
  pending,
} = require("../controllers/job/acceptReject");
const {
  allApplicants,
  acceptedApplicants,
  rejectedApplicants,
  pendingApplicants,
} = require("../controllers/job/filter.applicants");
const { apply, checkIfAppliedPerson } = require("../controllers/job/apply");
const createjob = require("../controllers/job/createJob");
const {
  allListedJob,
  listedJobs,
  jobDescription,
  specificCompanyJobs,
  setStatus,
  deletedJob,
} = require("../controllers/job/listedJob");
const {
  appliedJobs,
  acceptedJobs,
  pendingForReviewJobs,
  rejectedJobs,
} = require("../controllers/job/filter.Application");
const { searchByJob, searchByCompany } = require("../controllers/job/search");

router.post("/createjob", createjob);
router.get("/allListedJob", allListedJob);
router.post("/listedjob", listedJobs);
router.post("/listedjob/description", jobDescription);
router.post("/specificCompanyJobs", specificCompanyJobs);
router.post("/apply", apply);
router.post("/checkIfApplied", checkIfAppliedPerson);
router.post("/acceptApplicant", acceptApplicant);
router.post("/rejectApplicant", rejectApplicant);
router.post("/checkIfAppliedCompany", checkIfAppliedCompany);
router.post("/setStatus", setStatus);
router.post("/deleteJob", deletedJob);
router.post("/pending", pending);

// Filter Applicants
router.post("/allApplicants", allApplicants);
router.post("/acceptedApplicants", acceptedApplicants);
router.post("/rejectedApplicants", rejectedApplicants);
router.post("/pendingApplicants", pendingApplicants);

// Filter Application
router.post("/appliedJobs", appliedJobs);
router.post("/acceptedJobs", acceptedJobs);
router.post("/rejectedJobs", rejectedJobs);
router.post("/pendingForReviewJobs", pendingForReviewJobs);

// Filter Jobs
router.get("/searchByJob", searchByJob);
router.get("/searchByCompany", searchByCompany);

module.exports = router;
