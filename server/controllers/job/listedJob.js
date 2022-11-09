const company = require("../../models/company");
const job = require("../../models/job");

const allListedJob = (req, res) => {
  job
    .find({})
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

const listedJobs = (req, res) => {
  job
    .find({
      companyName: { $in: req.body.companyName },
    })
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

const jobDescription = (req, res) => {
  job
    .find({
      _id: { $in: req.body.id },
    })
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
};

const specificCompanyJobs = (req, res) => {
  company
    .find({
      _id: { $in: req.body.id },
    })
    .then((resp) => {
      job
        .find({
          companyName: { $in: resp[0].companyName },
        })
        .then((resp) => res.send(resp));
    })
    .catch((err) => res.send(err));
};

const setStatus = (req, res) => {
  job
    .updateOne(
      {
        _id: req.body.jobId,
      },
      {
        $set: {
          status: req.body.status,
        },
      }
    )
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

const deletedJob = (req, res) => {
  job
    .deleteOne({
      _id: { $in: req.body.id },
    })
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

module.exports = {
  deletedJob,
  allListedJob,
  listedJobs,
  jobDescription,
  specificCompanyJobs,
  setStatus,
};
