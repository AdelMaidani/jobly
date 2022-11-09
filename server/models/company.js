const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: {
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
    min: 4,
  },
  mobileNumber: {
    type: Number,
    required: true,
    min: 6,
  },
  website: {
    type: String,
    required: true,
    min: 6,
  },
  linkedin: {
    type: String,
    required: true,
    min: 6,
  },
  aboutTheCompany: {
    type: String,
    required: true,
    min: 10,
  },
  address: {
    type: String,
    required: true,
    min: 6,
  },
  country: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
  },
});

module.exports = mongoose.model("Company", companySchema);
