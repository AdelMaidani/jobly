const company = require("../../models/company");
const job = require("../../models/job");

const companyData = (req, res) => {
  company
    .find({
      _id: { $in: req.body.id },
    })
    .then((response) => {
      if (response.length === 0) {
      } else {
        res.send(response);
      }
    })
    .catch((err) => res.send(err));
};

const companies = (req, res) => {
  company
    .find({})
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
};

// Person Dashboard Routes
const CompanyDescription = (req, res) => {
  company
    .find({
      _id: { $in: req.body.id },
    })
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => res.send(err));
};

const companyJobs = (req, res) => {
  company
    .find({
      _id: { $in: req.body.id },
    })
    .then((resp) => {
      if (resp.lenght === 0) {
      } else {
        job
          .find({
            companyName: { $in: resp[0].companyName },
          })
          .then((data) => res.send(data));
      }
    });
};

module.exports = {
  companyData,
  companies,
  CompanyDescription,
  companyJobs,
};
