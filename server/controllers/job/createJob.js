const job = require("../../models/job");

const createjob = async (req, res) => {
  const Job = new job({
    titleofJob: req.body.titleOfJob,
    requirment: req.body.requirement,
    skillsRequired: req.body.skillsRequired,
    aboutTheJob: req.body.aboutTheJob,
    salary: req.body.salary,
    companyName: req.body.companyName,
    companyId: req.body.companyId,
    companyLogo: req.body.companyLogo,
    applicants: Array,
    acceptedApplicants: Array,
    rejectedApplicants: Array,
    pendingForReview: Array,
    status: "Active",
  });
  try {
    const saveData = await Job.save();
    res.send(saveData);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = createjob;
