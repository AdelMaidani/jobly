const job = require("../../models/job");

const searchByJob = (req, res) => {
  const { q } = req.query;
  job
    .find({ titleofJob: { $regex: q, $options: "i" } })
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

const searchByCompany = (req, res) => {
  const { p } = req.query;
  job
    .find({ companyName: { $regex: p, $options: "i" } })
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

module.exports = {
  searchByCompany,
  searchByJob,
};
