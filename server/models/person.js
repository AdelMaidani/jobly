const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  mobileNumber: {
    type: Number,
    required: true,
    min: 6,
  },
  country: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
    min: 6,
  },
  portfolioWebsite: {
    type: String,
    required: true,
    min: 6,
  },
  address: {
    type: String,
    required: true,
    min: 6,
  },
  jobs: {
    type: Array,
  },
  profilePicture: {
    type: String,
  },
  acceptedJobs: {
    type: Array,
  },
  rejectedJobs: {
    type: Array,
  },
  pendingForReview: {
    type: Array,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
