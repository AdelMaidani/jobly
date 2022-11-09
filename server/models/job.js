const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
  titleofJob: {
    type: String,
    required: true,
    min: 6,
  },
  requirment: {
    type: String,
    required: true,
    min: 6,
  },
  skillsRequired: {
    type: String,
    required: true,
    min: 4,
  },
  aboutTheJob: {
    type: String,
    required: true,
    min: 6,
  },
  salary: {
    type: String,
    required: true,
    min: 6,
  },
  companyName: {
    type: String,
    required: true,
    min: 6,
  },
  applicants: {
    type: Array,
  },
  pendingForReview: {
    type: Array,
  },
  companyLogo: {
    type: String,
  },
  acceptedApplicants: {
    type: Array,
  },
  rejectedApplicants: {
    type: Array,
  },
  status: {
    type: String,
    required: true,
  },
  companyId: {
    type: String,
  },
});

module.exports = mongoose.model("Jobs", jobsSchema);
