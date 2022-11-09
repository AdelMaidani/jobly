const job = require("../../models/job");
const person = require("../../models/person");

const allApplicants = (req, res) => {
  job
    .find({
      _id: { $in: req.body.id },
    })
    .then((response) => {
      person
        .find({
          _id: { $in: response[0].applicants },
        })
        .then((resp) => res.send(resp));
    })
    .catch((err) => res.send(err));
};

const acceptedApplicants = (req, res) => {
  job
    .find({
      _id: { $in: req.body.id },
    })
    .then((response) => {
      person
        .find({
          _id: { $in: response[0].acceptedApplicants },
        })
        .then((resp) => res.send(resp));
    })
    .catch((err) => res.send(err));
};

const rejectedApplicants = (req, res) => {
  job
    .find({
      _id: { $in: req.body.id },
    })
    .then((response) => {
      person
        .find({
          _id: { $in: response[0].rejectedApplicants },
        })
        .then((resp) => res.send(resp));
    })
    .catch((err) => res.send(err));
};

const pendingApplicants = (req, res) => {
  job
    .find({
      _id: { $in: req.body.id },
    })
    .then((response) => {
      person
        .find({
          _id: { $in: response[0].pendingForReview },
        })
        .then((resp) => res.send(resp));
    })
    .catch((err) => res.send(err));
};

module.exports = {
  allApplicants,
  acceptedApplicants,
  rejectedApplicants,
  pendingApplicants,
};
