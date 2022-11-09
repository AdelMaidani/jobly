const company = require("../../models/company");

const searchByCompany = (req, res) => {
  const { q } = req.query;
  company
    .find({ companyName: { $regex: q, $options: "i" } })
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};
const searchByPlace = (req, res) => {
  const { p } = req.query;
  company
    .find({ country: { $regex: p, $options: "i" } })
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

module.exports = {
  searchByPlace,
  searchByCompany,
};
